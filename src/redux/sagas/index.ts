import { all } from 'redux-saga/effects';
import bookWatcher from './BookSaga';

export default function* rootSaga() {
  yield all([bookWatcher]);
}
