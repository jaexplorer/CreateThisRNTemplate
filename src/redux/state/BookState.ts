import { BookResponse } from '../../models/book/Book';

export class BookState {
  public book: BookResponse | undefined;
}

export const initialBookState: BookState = {
  book: undefined,
};
