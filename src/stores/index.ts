import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { IUserReducer, userReducer } from './user/Reducer';
import thunk from 'redux-thunk';

export interface IReducer {
  userReducer: IUserReducer;
}

const rootReducer = combineReducers({
  userReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
