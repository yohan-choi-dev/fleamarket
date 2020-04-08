import React, { useState } from 'react';
import './UpdateContact.css';

import LabeledInputField from '../../LabeledInputField/LabeledInputField';
import Button from '../../Button/Button';

import { updateData } from '../../../utils/fetch-data';
import APIRoute from '../../../vars/api-routes';

function UpdateContact(props) {
  const { profile } = props;

  const [userAddress, setUserAddress] = useState({
    newApartmentNumber: profile.aptNumber == null ? 0 : profile.aptNumber,
    newBuildingNumber: profile.buildingNumber == null ? 0 : profile.buildingNumber,
    newStreetNumber: profile.streetNumber == null ? 0 : profile.streetNumber,
    newStreetName: profile.streetName,
    newCity: profile.city,
    newProvince: profile.province,
    newPostalCode: profile.postalCode,
    newCountry: profile.country
  });

  const updateUserAddress = async () => {
    const response = await updateData(
      `${APIRoute}/api/users/${profile.id}`,
      JSON.stringify({
        newAddress: userAddress
      }),
      'application/json'
    );

    if (response.status !== 200) {
      window.alert('Address could not be updated. Please try again.');
    } else {
      window.alert('Address updated successfully.');
    }
  }

  return (
    <div className="UpdateContact">
      <div className="UpdateContact-section UpdateContact-apartment">
        <LabeledInputField
          className="UpdateContact-apartment-number"
          label="Apartment Number"
          inputField={{
            id: 'UpdateContact-apartment-number',
            name: 'UpdateContact-apartment-number',
            type: 'number',
            autoFocus: true,
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newApartmentNumber: parseInt(event.target.value)
              })
            },
            value: userAddress.newApartmentNumber,
            style: {
              width: '85%'
            }
          }}
        />
        <LabeledInputField
          className="UpdateContact-building-number"
          label="Building Number"
          inputField={{
            id: 'UpdateContact-building-number',
            name: 'UpdateContact-building-number',
            type: 'number',
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newBuildingNumber: event.target.value
              })
            },
            value: userAddress.newBuildingNumber
          }}
        />
      </div>
      <div className="UpdateContact-section UpdateContact-street">
        <LabeledInputField
          className="UpdateContact-street-number"
          label="Street Number"
          inputField={{
            id: 'UpdateContact-street-number',
            name: 'UpdateContact-street-number',
            type: 'number',
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newStreetNumber: event.target.value
              })
            },
            value: userAddress.newStreetNumber,
            style: {
              width: '70%'
            }
          }}
        />
        <LabeledInputField
          className="UpdateContact-street-name"
          label="Street Name"
          inputField={{
            id: 'UpdateContact-street-name',
            name: 'UpdateContact-street-name',
            type: 'text',
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newStreetName: event.target.value
              })
            },
            value: userAddress.newStreetName
          }}
        />
      </div>
      <div className="UpdateContact-section UpdateContact-town">
        <LabeledInputField
          className="UpdateContact-city-town"
          label="City/Town"
          inputField={{
            id: 'UpdateContact-city-town',
            name: 'UpdateContact-city-town',
            type: 'text',
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newCity: event.target.value
              })
            },
            value: userAddress.newCity,
            style: {
              width: '70%'
            }
          }}
        />
        <LabeledInputField
          className="UpdateContact-province"
          label="Province"
          inputField={{
            id: 'UpdateContact-province',
            name: 'UpdateContact-province',
            type: 'text',
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newProvince: event.target.value
              })
            },
            value: userAddress.newProvince,
            style: {
              width: '50%'
            }
          }}
        />
        <LabeledInputField
          className="UpdateContact-postal-code"
          label="Postal Code"
          inputField={{
            id: 'UpdateContact-postal-code',
            name: 'UpdateContact-postal-code',
            type: 'text',
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newPostalCode: event.target.value
              })
            },
            value: userAddress.newPostalCode
          }}
        />
        <LabeledInputField
          className="UpdateContact-country"
          label="Country"
          inputField={{
            id: 'UpdateContact-country',
            name: 'UpdateContact-country',
            type: 'text',
            onChangeHandler: (event) => {
              setUserAddress({
                ...userAddress,
                newCountry: event.target.value
              })
            },
            value: userAddress.newCountry
          }}
        />
      </div>
      <Button otherClassName="purple" handleOnClick={updateUserAddress}>
        Update Email
      </Button>
    </div>
  );
}

export default UpdateContact;
