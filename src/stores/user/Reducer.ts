import { GET_CURRENT_LOCATION, USER_ERROR } from './Types';

export interface ICurrentPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  show: boolean;
}

export interface IUserReducer {
  position?: ICurrentPosition;
  error: string | object | null;
  loading: boolean;
}

const InitialState: IUserReducer = {
  error: null,
  loading: false,
};

const setCurrentLocation = (state: IUserReducer, action: any) => {
  return {
    ...state,
    position: action.payload,
    error: null,
  };
};

const Reducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case GET_CURRENT_LOCATION:
      return setCurrentLocation(state, action);
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const userReducer = Reducer;
