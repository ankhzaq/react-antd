import { takeLatest } from 'redux-saga/effects';

function* getData({}) {
  console.log("confirmation that sagas has been integrated with React hooks");
}

const hammurabiSagas = [
  takeLatest("hammurabi_grid_requested", getData),
];

export default hammurabiSagas;
