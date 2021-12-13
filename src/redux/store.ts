import { createStore, applyMiddleware, Store, Action, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers/RootReducer';
import * as Sentry from '@sentry/react-native';
import rootSaga from './sagas';
import { ApplicationState } from './state/ApplicationState';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
} as PersistConfig<ApplicationState>;

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sentryReduxEnhancer = Sentry.createReduxEnhancer();

let composeEnhancers = compose;
declare var window: any;
if (typeof window !== 'undefined') {
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
}

const store: Store<ApplicationState> = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware), sentryReduxEnhancer),
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export interface StoreAction<TType extends string, TPayload> extends Action<TType> {
  readonly type: TType;
  readonly data?: TPayload;
}

export default store;
