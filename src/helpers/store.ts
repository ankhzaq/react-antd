import { ActionReducer, BasicObject } from '../interfaces/common';
import { getSessionStorage, setSessionStorage } from './sessionStorage';
import { endpoints } from './calls';

export const NAME_SESSION_APP = "reactAntd";

export const call = async (endpoint: string) => {
  return fetch(endpoints["endpoint"])
    .then((resp) => resp)
    .catch((err) => err);
}

const ELEMENTS_BY_SCREEN: BasicObject = {
  hammurabi: ['filters', 'grid', 'graphicRules'],
  drilldown: ['filters', 'gridMetrics', 'graphicStorageZones'],
  objectsNoRules: ['filters'],
}

export const initState: BasicObject = {
  common: {
    countries: {
      data: ['AL', 'ESP', 'GLO', 'PER', 'HOL', 'PTR', 'ITA']
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
    },
    graphicStorageZones: {
      data: {}
    },
  },
  hammurabi: {
    filters: {},
    grid: {}
  },
  objectsNoRules: {
    filters: {
      dateUpdated: new Date().getTime(),
      data: {}
    },
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
  const stateToSave = JSON.parse(JSON.stringify(nextState));
  const nextReduxState = setSessionStorage(null, stateToSave);
  return nextReduxState;
}
