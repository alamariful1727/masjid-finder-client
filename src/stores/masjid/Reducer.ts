import { MASJID_ERROR, SET_NEW_MASJID_POSITION, TOGGLE_ADD_MASJID_FORM } from './Types';

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
  name: string;
  contactNo: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface IMasjidReducer {
  showAddForm: boolean;
  new: INewMasjid;
  error: string | object | null;
  loading: boolean;
}

const InitialState: IMasjidReducer = {
  showAddForm: false,
  new: {
    name: '',
    address: '',
    contactNo: '',
    latitude: 0,
    longitude: 0,
  },
  error: null,
  loading: false,
};

const setNewMasjidPosition = (state: IMasjidReducer, action: any) => {
  return {
    ...state,
    new: { ...state.new, ...action.payload },
    error: null,
  };
};

const Reducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case SET_NEW_MASJID_POSITION:
      return setNewMasjidPosition(state, action);
    case TOGGLE_ADD_MASJID_FORM:
      return {
        ...state,
        showAddForm: action.payload,
        loading: false,
      };
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
