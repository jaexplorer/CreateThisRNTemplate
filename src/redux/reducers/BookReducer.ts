import { Reducer } from 'redux';
import { BookResponse } from '../../models/book/Book';
import { BookAction, BookActionTypes } from '../actions/BookActions';
import { BookState, initialBookState } from '../state/BookState';

export const BookReducer: Reducer<BookState, BookAction> = (
  state = initialBookState,
  { type, data },
) => {
  switch (type) {
    case BookActionTypes.GET_BOOK_SUCCESS:
      return {
        ...state,
        book: data as BookResponse,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
