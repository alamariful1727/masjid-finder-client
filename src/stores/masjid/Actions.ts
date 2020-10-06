import { IReducer } from '..';
import { INewMasjid } from './Reducer';
import { SET_NEW_MASJID_POSITION, TOGGLE_ADD_MASJID_FORM } from './Types';

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
