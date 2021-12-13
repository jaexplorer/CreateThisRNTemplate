import { StoreAction } from '../store';
import { BookRequest, BookResponse } from '../../models/book/Book';

export enum BookActionTypes {
  GET_BOOK = 'GET_BOOK',
  GET_BOOK_REQUEST = 'GET_BOOK_REQUEST',
  GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS',
  GET_BOOK_ERROR = 'GET_BOOK_ERROR',
}

export type BookActionPayload = BookRequest | BookResponse | Error;
export type BookAction = StoreAction<BookActionTypes, BookActionPayload>;
export class BookActions {
  public static getBookRequest(data: BookRequest) {
    return { type: BookActionTypes.GET_BOOK_REQUEST, data };
  }
  public static getBookSuccess(data: BookResponse) {
    return { type: BookActionTypes.GET_BOOK_SUCCESS, data };
  }
  public static getBookError(data: Error) {
    return { type: BookActionTypes.GET_BOOK_ERROR, data };
  }
}
