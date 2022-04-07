import { endpoints } from './consts';
import { ActionReducer, BasicObject } from '../interfaces/common';
import { getSessionStorage, setSessionStorage } from './sessionStorage';

export const NAME_SESSION_APP = "reactAntd";

export const call = async (endpoint: string) => {
  return fetch(endpoints["endpoint"])
    .then((resp) => resp)
    .catch((err) => err);
}

const ELEMENTS_BY_SCREEN: BasicObject = {
  hammurabi: ['filters', 'grid', 'graphicRules'],
  drilldown: ['filters', 'gridMetrics'],
  objectsNoRules: ['filters'],
}

export const initState: BasicObject = {
  common: {
    countries: {
      data: ['ESP', 'GLO', 'PER', 'HOL', 'PTR', 'ITA']
    },
    rules: {
      data: {}
    },
    storageZones: {
      data: ['MASTER', 'SLAVE', 'STANING', 'PEPSI']
    },
  },
  drilldown: {
    filters: {},
    gridMetrics: {
      data: {}
    }
  },
  hammurabi: {
    filters: {},
    grid: {}
  },
  objectsNoRules: {
    filters: {},
    grid: {}
  }
}

export function reducer(state = initState, action: ActionReducer) {
  const { type, payload } = action;
  let nextState = state;
  if (type === '@@INIT' || !Object.keys(state).length) {
    nextState = getSessionStorage();
  }

  const screensKeys: string[] = Object.keys(ELEMENTS_BY_SCREEN);
  screensKeys.forEach((screenKey: string) => {
    const elements = ELEMENTS_BY_SCREEN[screenKey];
    elements.forEach((element: string) => {
      const screenState = nextState[screenKey];
      if (!screenState) debugger;
      const currentStateElement = screenState[element];

      if (type === `${screenKey}_${element}`) {
        screenState[element] = payload;
      } else if (type === `${screenKey}_${element}_failed`) {
        screenState[element] = { ...currentStateElement, loading: false, ...payload };
      } else if (type === `${screenKey}_${element}_requested`) {
        screenState[element] = { ...currentStateElement, loading: true, error: null, data: null };
      } else if (type === `${screenKey}_${element}_succeeded`) {
        screenState[element] = { ...currentStateElement, loading: false, error: null, ...payload };
      }
    });
  });
  const nextReduxState = setSessionStorage(null, nextState);
  return nextReduxState;
}
