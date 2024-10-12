import { lottoNumberReducer } from '../reducers/lottoNumbers';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';

const rootReducer = combineReducers({
  numbers: lottoNumberReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
  },
  rootReducer
);

export const store = createStore(persistedReducer, applyMiddleware(logger));

export const persistor = persistStore(store);

export default store;
