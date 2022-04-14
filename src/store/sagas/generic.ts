import { put, takeLatest } from 'redux-saga/effects';
import { commonHeaderRedux, getTypeInfo, SagasProperties } from '../../helpers/redux';
import { constants } from '../../helpers/consts';
import { endpoints } from '../../helpers/calls';

function* getDataGenericSagas({ type }: SagasProperties) {
  const { screen, element } = getTypeInfo(type);

  const endpointKey = `${screen}_${element}`;
  const endpointUrl: string = endpoints[endpointKey].url;

  // @ts-ignore
  const response = yield fetch(
    endpointUrl,
    {
      method: 'GET',
      headers: commonHeaderRedux,
    },
  );

  // @ts-ignore
  const responseParsed = yield response.json();
  const { data, pagination }  = responseParsed;
  let dataParsed = responseParsed
  if ((!pagination || (pagination && pagination.totalPages === 1)) && (data && data.data)) {
    dataParsed = data.data;
  }
  yield put({ type: `${screen}_${element}_${constants.COMMON.SUCCEEDED}`, payload: { data: dataParsed } });
}

const getEndpointsToGenericSagas = () => {
  const endpointKeys = Object.keys(endpoints);
  const endpointKeysGenericSagas = endpointKeys.filter((endpointKey) => endpoints[endpointKey].genericSagas);
  return endpointKeysGenericSagas.map((key: string) => {
    const [screen, element] = key.split('_');
    return takeLatest(`${screen}_${element}_${constants.COMMON.REQUESTED}`, getDataGenericSagas);
  });
}

const genericSagas = getEndpointsToGenericSagas();

export default genericSagas;
