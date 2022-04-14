export const getTypeInfo = (type: string) => {
  const [screen, element, operation] = type.split('_');
  return { element, operation, screen }
}

export interface SagasProperties {
  payload: any;
  type: string;
}

export const commonHeaderRedux = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'accept': 'application/json'
};
