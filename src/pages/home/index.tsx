import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { IReducer } from '../../stores';
import { getLocationAction } from '../../stores/user/Actions';
import { toggleAddMasjidFormAction, getAllMasjidsAction } from '../../stores/masjid/Actions';
import { AddMasjidForm } from './AddMasjidForm';
import Map from './Map';

interface Props {
  getLocationAction: () => void;
  toggleAddMasjidFormAction: () => void;
  getAllMasjidsAction: () => Promise<any>;
}

const HomeComponent: React.FC<Props> = ({ getLocationAction, toggleAddMasjidFormAction, getAllMasjidsAction }) => {
  const currentPosition = useSelector((state: IReducer) => state.userReducer.position);
  const showAddForm = useSelector((state: IReducer) => state.masjidReducer.showAddForm);

  useEffect(() => {
    getAllMasjidsAction();
  }, [getAllMasjidsAction]);

  return (
    <div className="container mx-auto px-3 py-4 flex flex-col md:flex-row md:space-x-3">
      <div className="md:w-64 lg:w-1/3">
        <div className="mb-5">
          <p className="font-semibold">For nearby feature, you have to give permission for your location.</p>
          <button
            className="bg-gray-800 px-6 py-2 my-2 rounded text-yellow-500 font-semibold hover:bg-gray-900 transition ease-in-out duration-300 focus:outline-none"
            onClick={getLocationAction}
          >
            Find Me
          </button>
        </div>
        {currentPosition && currentPosition.show && (
          <div className="mb-5">
            <h2 className="font-bold">Your location</h2>
            <p>Latitude: {currentPosition.latitude}</p>
            <p>Longitude: {currentPosition.longitude}</p>
            <p>Accuracy: {currentPosition.accuracy}</p>
          </div>
        )}
        {showAddForm ? (
          <AddMasjidForm />
        ) : (
          <div className="mb-5">
            <h2 className="font-semibold">Do you want to add a Masjid information ?</h2>
            <button
              className="bg-gray-800 px-6 py-2 my-2 rounded text-yellow-500 font-semibold hover:bg-gray-900 transition ease-in-out duration-300 focus:outline-none"
              onClick={toggleAddMasjidFormAction}
            >
              Add Masjid
            </button>
          </div>
        )}
      </div>
      <div className="h-screen flex-1">
        <Map />
      </div>
    </div>
  );
};

const Home = connect(null, { getLocationAction, toggleAddMasjidFormAction, getAllMasjidsAction })(HomeComponent);

export default Home;
