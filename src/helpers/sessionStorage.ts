export const getSessionStorage = (key: string) => {
  if (!key) return {};
  const session = sessionStorage.getItem(key);
  if (!session) return {};
  return JSON.parse(session);
}

export const setSessionStorage = (key: string, data: any) => {
  if (key && data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
}
