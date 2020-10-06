import React, { useCallback, useEffect } from 'react';
import { IMasjid } from '../../stores/masjid/Reducer';
import { useForm } from 'react-hook-form';
import { connect, useSelector } from 'react-redux';
import { IReducer } from '../../stores';
import { CancelIcon } from '../../icons/Cancel';
import { toggleAddMasjidFormAction } from './../../stores/masjid/Actions';

interface IData extends Pick<IMasjid, 'name' | 'address' | 'contactNo' | 'latitude' | 'longitude'> {}

interface Props {
  toggleAddMasjidFormAction: () => void;
}

const AddMasjidFormComponent: React.FC<Props> = ({ toggleAddMasjidFormAction }) => {
  const { name, address, contactNo, latitude, longitude } = useSelector((state: IReducer) => state.masjidReducer.new);

  const { register, handleSubmit, errors, setValue } = useForm<IData>({
    reValidateMode: 'onChange',
    defaultValues: {
      name: name,
      address: address,
      contactNo: contactNo,
      latitude: latitude,
      longitude: longitude,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const updatePositions = useCallback(() => {
    setValue('latitude', latitude);
    setValue('longitude', longitude);
  }, [setValue, latitude, longitude]);

  useEffect(() => {
    updatePositions();
  }, [updatePositions]);

  return (
    <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 my-5">
      <div className="flex justify-between">
        <h2 className="font-bold mb-2">Add Masjid's Location</h2>
        <div onClick={toggleAddMasjidFormAction}>
          <CancelIcon className="h-6 fill-current text-red-500 cursor-pointer" />
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            ref={register({ required: true, minLength: 2, maxLength: 150 })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            name="address"
            type="text"
            placeholder="Address"
            ref={register({ required: true, minLength: 2, maxLength: 500 })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNo">
            Contact Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contactNo"
            name="contactNo"
            type="text"
            placeholder="Contact number"
            ref={register({ required: true, maxLength: 14 })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
            Latitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="latitude"
            name="latitude"
            type="number"
            readOnly
            placeholder="Latitude"
            ref={register({ required: true, min: -90, max: 90 })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
            Longitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="longitude"
            name="longitude"
            type="number"
            readOnly
            placeholder="Longitude"
            ref={register({ required: true, min: -180, max: 180 })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-800 px-6 py-2 my-2 rounded text-yellow-500 font-semibold hover:bg-gray-900 transition ease-in-out duration-300 focus:outline-none"
            type="submit"
          >
            ADD
          </button>
          <button
            className="bg-red-500 px-6 py-2 my-2 rounded text-white font-semibold hover:bg-red-700 transition ease-in-out duration-300 focus:outline-none"
            type="reset"
          >
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export const AddMasjidForm = connect(null, { toggleAddMasjidFormAction })(AddMasjidFormComponent);
