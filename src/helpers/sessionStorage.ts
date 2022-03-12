import { NAME_SESSION_APP } from './store';

export const getSessionStorage = (key?: string) => {
  const sessionApp = sessionStorage.getItem(NAME_SESSION_APP);
  if (!sessionApp) return {};
  if (!key) return JSON.parse(sessionApp);

  const sessionParsed = JSON.parse(sessionApp);
  return sessionParsed[key] || {};
}

export const setSessionStorage = (key: string, data: any) => {
  const stateApp = getSessionStorage();
  if (!stateApp) {
    sessionStorage.setItem(NAME_SESSION_APP, "{}");
  }
  if (key && data) {
    stateApp[key] = data;
    sessionStorage.setItem(NAME_SESSION_APP, JSON.stringify(stateApp));
  }
}
