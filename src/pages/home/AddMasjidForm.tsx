import React, { useCallback, useEffect } from 'react';
import { INewMasjid } from '../../stores/masjid/Reducer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { connect, useSelector } from 'react-redux';
import { IReducer } from '../../stores';
import { CancelIcon } from '../../components/icons/Cancel';
import { toggleAddMasjidFormAction, addNewMasjidAction } from './../../stores/masjid/Actions';

interface Props {
  toggleAddMasjidFormAction: () => void;
  addNewMasjidAction: (data: INewMasjid) => Promise<any>;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Should be at least 2 characters long')
    .max(150, 'Should be less then 150 characters')
    .required('Required'),
  contactNo: Yup.string().max(14, 'Should be less then 14 characters').required('Required'),
  address: Yup.string()
    .min(2, 'Should be at least 2 characters long')
    .max(500, 'Should be less then 500 characters')
    .required('Required'),
  latitude: Yup.number()
    .notOneOf([0], "Can't be '0'")
    .min(-90, 'Should be less then -90 characters')
    .max(90, 'Should be less then 90 characters')
    .required('Required'),
  longitude: Yup.number()
    .notOneOf([0], "Can't be '0'")
    .min(-180, 'Should be less then -180 characters')
    .max(180, 'Should be less then 180 characters')
    .required('Required'),
});

const AddMasjidFormComponent: React.FC<Props> = ({ toggleAddMasjidFormAction, addNewMasjidAction }) => {
  const { name, address, contactNo, latitude, longitude } = useSelector((state: IReducer) => state.masjidReducer.new);

  const { register, handleSubmit, errors, setValue } = useForm<INewMasjid>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: name,
      address: address,
      contactNo: contactNo,
      latitude: latitude,
      longitude: longitude,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await addNewMasjidAction(data);
    if (res.status === 201) {
      toggleAddMasjidFormAction();
    }
  });

  const updatePositions = useCallback(() => {
    if (latitude !== 0 && longitude !== 0) {
      setValue('latitude', latitude, { shouldValidate: true });
      setValue('longitude', longitude, { shouldValidate: true });
    }
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
            ref={register}
          />
          {errors.name && <p className="text-red-500 text-xs italic font-medium mt-1">{errors.name.message}</p>}
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
            ref={register}
          />
          {errors.address && <p className="text-red-500 text-xs italic font-medium mt-1">{errors.address.message}</p>}
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
            ref={register}
          />
          {errors.contactNo && (
            <p className="text-red-500 text-xs italic font-medium mt-1">{errors.contactNo.message}</p>
          )}
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
            ref={register}
          />
          {errors.latitude ? (
            <p className="text-red-500 text-xs italic font-medium mt-1">{errors.latitude.message}</p>
          ) : (
            <p className="text-gray-500 text-xs italic font-medium mt-1">Click on Map to set a value</p>
          )}
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
            ref={register}
          />
          {errors.longitude ? (
            <p className="text-red-500 text-xs italic font-medium mt-1">{errors.longitude.message}</p>
          ) : (
            <p className="text-gray-500 text-xs italic font-medium mt-1">Click on Map to set a value</p>
          )}
        </div>
        <button
          className="bg-gray-800 px-6 py-2 my-2 rounded text-yellow-500 font-semibold hover:bg-gray-900 transition ease-in-out duration-300 focus:outline-none"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export const AddMasjidForm = connect(null, { toggleAddMasjidFormAction, addNewMasjidAction })(AddMasjidFormComponent);
