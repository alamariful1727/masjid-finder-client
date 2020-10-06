import { MASJID_ERROR, SET_NEW_MASJID_DATA } from './Types';

export interface IMasjid {
  _id: string;
  name: string;
  contactNo: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface INewMasjid {
  name?: string;
  contactNo?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

export interface IMasjidReducer {
  new?: INewMasjid;
  error: string | object | null;
  loading: boolean;
}

const InitialState: IMasjidReducer = {
  new: {
    latitude: 23.77369751309301,
    longitude: 90.3840690581665,
  },
  error: null,
  loading: false,
};

const setNewMasjidData = (state: IMasjidReducer, action: any) => {
  return {
    ...state,
    new: { ...state.new, ...action.payload },
    error: null,
  };
};

const Reducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case SET_NEW_MASJID_DATA:
      return setNewMasjidData(state, action);
    case MASJID_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const masjidReducer = Reducer;
