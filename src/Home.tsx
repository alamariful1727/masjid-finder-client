import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { MAP_KEY } from './config';

const Home = () => {
  const [position, setPosition] = useState<{ latitude: number; longitude: number; accuracy: number }>();

  // google-map-react states
  const [zoom] = useState(13);

  const getPositions = (position: Position) => {
    console.log(position);
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
    });
  };

  const handleLocationError = (error: PositionError) => {
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
  };

  const getLocation = React.useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPositions, handleLocationError, {
        enableHighAccuracy: true,
        timeout: 5000, // ? integer (milliseconds) - amount of time before the error callback is invoked, if 0 it will never invoke.
        maximumAge: 0, // ? integer (milliseconds) | infinity - maximum cached position age.
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);
  return (
    <div>
      <h1>Event Locator Client</h1>
      <p>For nearby feature, you have to give permission for your location.</p>
      {position && (
        <div>
          <h2>Your location</h2>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <p>Accuracy: {position.accuracy}</p>
        </div>
      )}
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MAP_KEY }}
          defaultCenter={{
            lat: position ? position.latitude : 23.765057,
            lng: position ? position.longitude : 90.388661,
          }}
          defaultZoom={zoom}
        >
          {/* markers */}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Home;
