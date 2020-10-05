import React from 'react';
import { useSelector, connect } from 'react-redux';
import { IReducer } from '../../stores';
import { getLocationAction } from '../../stores/user/Actions';
import Map from './Map';

interface Props {
  getLocationAction: () => void;
}

const HomeComponent: React.FC<Props> = ({ getLocationAction }) => {
  const currentPosition = useSelector((state: IReducer) => state.userReducer.position);

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
            onClick={getLocationAction}
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
        <Map />
      </div>
    </div>
  );
};

const Home = connect(null, { getLocationAction })(HomeComponent);

export default Home;
