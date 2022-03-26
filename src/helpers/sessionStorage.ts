import { initState, NAME_SESSION_APP } from './store';

export const getSessionStorage = (key?: string) => {
  const sessionApp = sessionStorage.getItem(NAME_SESSION_APP);
  if (!sessionApp) return initState;
  if (!key) return JSON.parse(sessionApp);

  const sessionParsed = JSON.parse(sessionApp);
  return sessionParsed[key] || {};
}

export const setSessionStorage = (key: string | null, data: any) => {
  const stateApp = getSessionStorage();
  if (data) {
    if (key) {
      stateApp[key] = data;
      sessionStorage.setItem(NAME_SESSION_APP, JSON.stringify(stateApp));
    } else {
      sessionStorage.setItem(NAME_SESSION_APP, JSON.stringify(data));
      return data;
    }
  }
  return stateApp;
}

export const initializeStore = () => {
  const sessionApp = sessionStorage.getItem(NAME_SESSION_APP);
  if (!sessionApp) {
    sessionStorage.setItem(NAME_SESSION_APP, JSON.stringify(initState));
  }
}
