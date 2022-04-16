import env from "react-dotenv";
/* eslint-disable max-len */

/**
 * Get the state from the appropriate LocalStorage key.
 * @returns {Object} An object containing the previously persisted state, if any; null otherwise.
 */
const getState = () => {
  const sessionApp = sessionStorage.getItem("reactAntd");
  if (!sessionApp) return {};
  return JSON.parse(sessionApp);
};

/**
 * Save the state into the appropriate LocalStorage key.
 * @param {Object} state An object containing the representation of the current Redux store state to persist. If
 *                       No state is passed, the function will add as "clear" (removing any persisted state).
 * @returns {Boolean} True if persisted/removed correctly; false otherwise.
 */
const saveState = (state = {}) => {
  /*const toPersistData = JSON.stringify(state);

  if (toPersistData) {
    try {
      localStorage.setItem(LOCAL_STORAGE_STATUS_KEY, toPersistData);
      return true;
    } catch (Ex) {
      return null;
    }
  } else {
    try {
      localStorage.removeItem(LOCAL_STORAGE_STATUS_KEY);
      return true;
    } catch (Ex) {
      return null;
    }
  }*/
};

/**
 * Main function that generates an object containing the middleware to use, as well as the getState utility function
 * used to inject the persisted state in the Redux stare as initial state (since replacing the initial/current
 * state is an anti-pattern and the store object does not allow this).
 * @returns {Object} An object containing the middleware and the getState function.
 */
const getMiddleware = () => {
  if (
    localStorage // Check for localStorage API (although, we are in 2019, ffs!).
        && localStorage.getItem
        && localStorage.setItem
        && env // Only act as middleware if we are in development environment.
        && env.ENV === 'development'
  ) {
    // This variable will be captured by the middleware function, so it will persist between actions/updates.
    const status = {
      state: null,
      updatedAt: null,
    };

    status.saveState = () => saveState(status.state);
    status.getPersistedState = () => getState();
    status.clearState = () => saveState();
    window._reduxStatus = status; // Make the current Redux state available as global.

    const middleware = (store) => (next) => (action) => {
      next(action);
      status.state = store.getState();
      status.updatedAt = new Date();
    };

    return {
      middleware,
      getState,
    };
  }

  return {
    middleware: () => (next) => (action) => next(action),
    getState: () => {},
  };
};

export default getMiddleware;
