import { endpoints } from 'helpers/calls';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getData({}) {
  console.log("confirmation that sagas has been integrated with React hooks");
}

function* getGraphicRules({}) {
  // @ts-ignore
  const data = yield call(() =>
    fetch(endpoints.hammurabiGraphicRules.url)
      .then(response => response.json())
      .then(response => response.data.map((ruleInfo: any) => {
        const { principleType, ruleType } = ruleInfo
        return ({ ...ruleInfo, rule: `${principleType}.${ruleType}`});
      }))
  );
  yield put({
    type: 'hammurabi_graphicRules_succeeded',
    payload: { data },
  });
}

const hammurabiSagas = [
  takeLatest("hammurabi_grid_requested", getData),
  takeLatest("hammurabi_graphicRules_requested", getGraphicRules),
];

export default hammurabiSagas;
