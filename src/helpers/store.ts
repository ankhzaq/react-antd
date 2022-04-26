import { ActionReducer, BasicObject } from '../interfaces/common';
import mockupRules from '../mockups/rules.json';
import { getSessionStorage, setSessionStorage } from './sessionStorage';
import { endpoints } from './calls';

export const NAME_SESSION_APP = "reactAntd";

export const call = async (endpoint: string) => {
  return fetch(endpoints[endpoint])
    .then((resp) => resp)
    .catch((err) => err);
}

const ELEMENTS_BY_SCREEN: BasicObject = {
  refusals: ['filters', 'filtersPanel', 'grid'],
  hammurabi: ['filters', 'filtersPanel', 'grid', 'graphicRules'],
  drilldown: ['filters', 'graphicStorageZones', 'gridMetrics', 'gridStatusByObject'],
  objectsNoRules: ['filters'],
}

export const initState: BasicObject = {
  common: {
    countries: {
      data: ['AL', 'ESP', 'GLO', 'PER', 'HOL', 'PTR', 'ITA']
    },
    rules: {
      data: mockupRules.data
    },
    storageZones: {
      data: ['MASTER', 'SLAVE', 'STANING', 'PEPSI']
    },
  },
  drilldown: {
    filtersPanel: {
      data: {},
      dateUpdated: new Date().getTime()
    },
    filters: {},
    graphicStorageZones: {
      data: {}
    },
    gridStatusByObject: {
      data: {}
    },
    gridMetrics: {
      data: {}
    }
  },
  hammurabi: {
    filtersPanel: {
      data: {},
      dateUpdated: new Date().getTime()
    },
    filters: {},
    grid: {}
  },
  refusals: {
    filtersPanel: {
      data: {},
      dateUpdated: new Date().getTime()
    },
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
        screenState[element].data = payload;
        screenState[element].date = new Date().getTime();
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
