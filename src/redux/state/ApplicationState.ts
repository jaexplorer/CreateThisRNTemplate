import { BookState, initialBookState } from '../state/BookState';
import { ErrorState, initialErrorState } from '../state/ErrorState';
import { LoadingState, initialLoadingState } from '../state/LoadingState';

export interface ApplicationState {
  bookState: BookState;
  loadingState: LoadingState;
  errorState: ErrorState;
}

export const initialState: ApplicationState = {
  bookState: initialBookState,
  loadingState: initialLoadingState,
  errorState: initialErrorState,
};
