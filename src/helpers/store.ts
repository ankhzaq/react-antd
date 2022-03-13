import { endpoints } from './consts';
import { ActionReducer, BasicObject } from '../interfaces/common';
import { setSessionStorage } from './sessionStorage';

export const NAME_SESSION_APP = "reactAntd";

export const call = async (endpoint: string) => {
  return fetch(endpoints["endpoint"])
    .then((resp) => resp)
    .catch((err) => err);
}

export function reducer(state: BasicObject = {}, action: ActionReducer) {
  const { type, payload, screen, elements } = action;
  const nextState = state;
  if (screen && elements) {
    elements.forEach((element) => {
      if (type === `${screen}_${element}`) {
        nextState[element] = payload;
      } else if (type === `${screen}_${element}_failed`) {
        const currentStateElement = state[element] || {};
        nextState[element] = { ...currentStateElement, loading: false, ...payload };
      } else if (type === `${screen}_${element}_requested`) {
        const currentStateElement = state[element] || {};
        nextState[element] = { ...currentStateElement, loading: true, error: null, data: null };
      } else if (type === `${screen}_${element}_succeeded`) {
        const currentStateElement = state[element] || {};
        const nextState = state;
        nextState[element] = { ...currentStateElement, loading: false, error: null, ...payload };
        return nextState;
      }
    });
    setSessionStorage(screen, nextState);
  }
  return nextState;
}

export function rootReducer(state: BasicObject = {}, action: ActionReducer) {
  const { type, payload } = action;
  const screen = 'hammurabi';
  const elements = ['grid'];
  const nextState = state;
  elements.forEach((element) => {
    if (type === `${screen}_${element}`) {
      nextState[element] = payload;
    } else if (type === `${screen}_${element}_failed`) {
      const currentStateElement = state[element] || {};
      nextState[element] = { ...currentStateElement, loading: false, ...payload };
    } else if (type === `${screen}_${element}_requested`) {
      const currentStateElement = state[element] || {};
      nextState[element] = { ...currentStateElement, loading: true, error: null, data: null };
    } else if (type === `${screen}_${element}_succeeded`) {
      const currentStateElement = state[element] || {};
      const nextState = state;
      nextState[element] = { ...currentStateElement, loading: false, error: null, ...payload };
      return nextState;
    }
  });

  setSessionStorage(screen, nextState);
  return nextState;
}
