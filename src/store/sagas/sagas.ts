import { all } from 'redux-saga/effects';
import drilldownSagas from './drilldown';
import hammurabiSagas from './hammurabi';


export default function* rootSaga() {
  yield all([
    ...drilldownSagas,
    ...hammurabiSagas
  ]);
}
