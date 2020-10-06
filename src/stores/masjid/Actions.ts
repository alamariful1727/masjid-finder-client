import { IReducer } from '..';
import { baseApi } from '../../config';
import { INewMasjid } from './Reducer';
import {
  ADD_NEW_MASJID,
  GET_All_MASJIDS,
  MASJID_ERROR,
  SET_NEW_MASJID_POSITION,
  TOGGLE_ADD_MASJID_FORM,
} from './Types';

export const setNewMasjidPositionAction = (position: {
  latitude: INewMasjid['latitude'];
  longitude: INewMasjid['longitude'];
}) => (dispatch: any, getState: () => IReducer) => {
  dispatch({
    type: SET_NEW_MASJID_POSITION,
    payload: position,
  });
};

export const toggleAddMasjidFormAction = () => (dispatch: any, getState: () => IReducer) => {
  dispatch({
    type: TOGGLE_ADD_MASJID_FORM,
    payload: !getState().masjidReducer.showAddForm,
  });
};

export const getAllMasjidsAction = () => async (dispatch: any, getState: () => IReducer) => {
  try {
    const response = await baseApi.get('masjids');
    if (response.status === 200) {
      dispatch({
        type: GET_All_MASJIDS,
        payload: response.data.masjids,
      });
    }
    return response;
  } catch (error) {
    if (error.message === 'Network Error') {
      dispatch({ type: MASJID_ERROR, payload: 'Network error' });
    } else {
      dispatch({
        type: MASJID_ERROR,
        payload: error.response,
      });
    }
    return error.response;
  }
};

export const addNewMasjidAction = (data: INewMasjid) => async (dispatch: any, getState: () => IReducer) => {
  try {
    const response = await baseApi.post('masjids', data);
    if (response.status === 201) {
      dispatch({
        type: ADD_NEW_MASJID,
        payload: response.data.masjid,
      });
    }
    return response;
  } catch (error) {
    if (error.message === 'Network Error') {
      dispatch({ type: MASJID_ERROR, payload: 'Network error' });
    } else {
      dispatch({
        type: MASJID_ERROR,
        payload: error.response,
      });
    }
    return error.response;
  }
};
