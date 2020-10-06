import { GET_CURRENT_LOCATION } from './Types';

export const getLocationAction = () => (dispatch: any, getState: any) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        dispatch({
          type: GET_CURRENT_LOCATION,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            show: true,
          },
        });
      },
      (error: PositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
          default:
            alert(`A Geolocation error[${error.code}] occurred.`);
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000, // ? integer (milliseconds) - amount of time before the error callback is invoked, if 0 it will never invoke.
        maximumAge: 0, // ? integer (milliseconds) | infinity - maximum cached position age.
      },
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};
