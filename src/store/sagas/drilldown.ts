import { call, put, takeLatest } from 'redux-saga/effects';
import { endpoints } from '../../helpers/consts';

function* getDataMetrics({}) {
  // @ts-ignore
  const data = yield call(() =>
    fetch(endpoints.drilldownGridMetrics.url)
      .then(response => response.json())
  );

  yield put({
    type: 'drilldown_gridMetrics_succeeded',
    payload: { data },
  });
}

const hammurabiSagas = [
  takeLatest("drilldown_gridMetrics_requested", getDataMetrics),
];

export default hammurabiSagas;
