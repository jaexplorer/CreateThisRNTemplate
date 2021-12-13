/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { takeEvery, put } from 'redux-saga/effects';
import { BookRequest, BookResponse } from '../../models/book/Book';
import { BookAction, BookActions, BookActionTypes } from '../actions/BookActions';
import { logError } from '../../analytics/Analytics';

export function* getBookRequest({ type, data }: BookAction) {
  try {
    const response: BookResponse = { name: 'test', author: 'test', value: 1 };
    yield put(BookActions.getBookSuccess(response));
  } catch (error) {
    logError('BookSaga.getBookRequest', {
      error,
      type,
      data,
    });
    yield put(BookActions.getBookError(error as Error));
  }
}

const bookWatcher = [
  takeEvery(BookActionTypes.GET_BOOK_REQUEST, (action: BookAction) =>
    getBookRequest({
      type: action.type,
      data: action.data,
    }),
  ),
];

export default bookWatcher;
