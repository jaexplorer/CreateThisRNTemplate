import { combineReducers, AnyAction } from 'redux';
import { ApplicationState, initialState } from '../state/ApplicationState';
import { BookReducer } from './BookReducer';
import { ErrorReducer } from './ErrorReducer';
import { LoadingReducer } from './LoadingReducer';

const rootReducer = combineReducers<ApplicationState>({
  bookState: BookReducer,
  loadingState: LoadingReducer,
  errorState: ErrorReducer,
});

export default (state: ApplicationState | undefined, action: AnyAction) => {
  // Example condition if you need to clear data eg. Logging out
  if (action.type === 'RESET_STORE') {
    return rootReducer(initialState, action);
  }
  return rootReducer(state, action);
};
