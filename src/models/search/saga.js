import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { SET_QUERY } from './constants';

export function* setQuery() {
  yield put(push('/manage/incidents'));
}

export default function* watchSearchSaga() {
  yield takeLatest(SET_QUERY, setQuery);
}