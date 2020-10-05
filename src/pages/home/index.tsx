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
  const newMasjid = useSelector((state: IReducer) => state.masjidReducer.new);

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
            <h2 className="font-bold">Your location</h2>
            <p>Latitude: {currentPosition.latitude}</p>
            <p>Longitude: {currentPosition.longitude}</p>
            <p>Accuracy: {currentPosition.accuracy}</p>
          </div>
        )}
        {/* TODO: Use REACT-HOOK-FORM */}
        {newMasjid && (
          <div className="my-5">
            <h2 className="font-bold mb-2">Add Masjid's Location</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={newMasjid.name}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                value={newMasjid.address}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNo">
                Contact Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactNo"
                type="text"
                placeholder="Contact number"
                value={newMasjid.contactNo}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                Latitude
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="latitude"
                type="number"
                readOnly
                placeholder="Latitude"
                value={newMasjid.latitude}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                Longitude
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="longitude"
                type="number"
                readOnly
                placeholder="Longitude"
                value={newMasjid.longitude}
              />
            </div>
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
