import { all } from 'redux-saga/effects';
import hammurabiSagas from './hammurabi';


export default function* rootSaga() {
  yield all([
    ...hammurabiSagas
  ]);
}
