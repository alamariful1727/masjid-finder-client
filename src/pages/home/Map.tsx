import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MAP_KEY } from '../../config';
import { IReducer } from '../../stores';

const center = {
  lat: 23.765057,
  lng: 90.388661,
};

const Map = () => {
  const currentPosition = useSelector((state: IReducer) => state.userReducer.position);

  // @react-google-maps/api states
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });

  const [zoom] = useState(14);

  const mapRef = React.useRef<google.maps.Map<Element>>();

  const onMapLoad = React.useCallback((map: google.maps.Map<Element>) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback((data: { lat: number; lng: number }) => {
    if (mapRef && mapRef.current) {
      mapRef.current.panTo(data);
      mapRef.current.setZoom(14);
    }
  }, []);

  useEffect(() => {
    if (currentPosition) {
      panTo({ lat: currentPosition.latitude, lng: currentPosition.longitude });
    }
  }, [panTo, currentPosition]);

  if (loadError) return <p>{loadError}</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap mapContainerClassName="h-full" zoom={zoom} center={center} onLoad={onMapLoad}>
      {/* ? show your current position */}
      {currentPosition && currentPosition.show && (
        <Marker
          key={currentPosition.accuracy}
          position={{ lat: currentPosition.latitude, lng: currentPosition.longitude }}
          icon={{
            url: '/user-location.svg',
            origin: new window.google.maps.Point(0, 0),
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
