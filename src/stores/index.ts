import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { IUserReducer, userReducer } from './user/Reducer';
import thunk from 'redux-thunk';
import { IMasjidReducer, masjidReducer } from './masjid/Reducer';

export interface IReducer {
  masjidReducer: IMasjidReducer;
  userReducer: IUserReducer;
}

const rootReducer = combineReducers({
  masjidReducer,
  userReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
