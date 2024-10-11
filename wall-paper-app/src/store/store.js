import { applyMiddleware, combineReducers, createStore } from 'redux';
import { favoriteListReducer } from '../reducer/favoriteReducer';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  favorite: favoriteListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(logger));
