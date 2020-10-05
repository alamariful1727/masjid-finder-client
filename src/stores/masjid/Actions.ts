import { INewMasjid } from './Reducer';
import { SET_NEW_MASJID_DATA } from './Types';

export const setNewMasjidDataAction = (data: INewMasjid) => (dispatch: any, getState: any) => {
  dispatch({
    type: SET_NEW_MASJID_DATA,
    payload: data,
  });
};
