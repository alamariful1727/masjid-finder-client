import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { MAP_KEY } from './config';

const center = {
  lat: 23.765057,
  lng: 90.388661,
};

interface ICurrentPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  show: boolean;
}

const Home = () => {
  const [currentPosition, setCurrentPosition] = useState<ICurrentPosition>();

  // @react-google-maps/api states
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });
  const [zoom] = useState(14);
  const mapRef = React.useRef<google.maps.Map<Element>>();

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

  const onMapLoad = React.useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    if (mapRef && mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
    }
  }, []);

  const getLocation = React.useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          setCurrentPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            show: true,
          });
          panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        handleLocationError,
        {
          enableHighAccuracy: true,
          timeout: 5000, // ? integer (milliseconds) - amount of time before the error callback is invoked, if 0 it will never invoke.
          maximumAge: 0, // ? integer (milliseconds) | infinity - maximum cached position age.
        },
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, [panTo]);

  if (loadError) return <p>{loadError}</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="antialiased h-screen container mx-auto px-3 py-4 md:flex md:space-x-3">
      <div className="md:w-64">
        <h1 className="font-semibold text-2xl">
          <span role="img" aria-label="Emoji : Kaba Sharif">
            🕋
          </span>{' '}
          Masjid Finder{' '}
          <span role="img" aria-label="Emoji : Masjid">
            🕌
          </span>
        </h1>
        <div className="my-5">
          <p>For nearby feature, you have to give permission for your location.</p>
          <button
            className="bg-gray-800 px-2 py-1 my-2 rounded text-yellow-500 font-semibold hover:bg-gray-900 transition ease-in-out duration-300 focus:outline-none"
            onClick={getLocation}
          >
            Find Me
          </button>
        </div>
        {currentPosition && currentPosition.show && (
          <div className="my-5">
            <h2 className="font-semibold">Your location</h2>
            <p>Latitude: {currentPosition.latitude}</p>
            <p>Longitude: {currentPosition.longitude}</p>
            <p>Accuracy: {currentPosition.accuracy}</p>
          </div>
        )}
      </div>
      <div className="h-full md:flex-1">
        <GoogleMap mapContainerClassName="h-full" zoom={zoom} center={center} onLoad={onMapLoad}>
          {currentPosition && currentPosition.show && (
            <Marker
              key={currentPosition.accuracy}
              position={{ lat: currentPosition.latitude, lng: currentPosition.longitude }}
              icon={{
                url: '/location.svg',
                origin: new window.google.maps.Point(0, 0),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Home;
