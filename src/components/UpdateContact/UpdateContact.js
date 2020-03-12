import React from 'react';
import './UpdateContact.css';

import LabeledInputField from '../LabeledInputField/LabeledInputField';

function UpdateContact(props) {
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
            onChangeHandler: () => { },
            value: '',
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
            onChangeHandler: () => { },
            value: ''
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
            onChangeHandler: () => { },
            value: '',
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
            onChangeHandler: () => { },
            value: ''
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
            onChangeHandler: () => { },
            value: '',
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
            onChangeHandler: () => { },
            value: '',
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
            onChangeHandler: () => { },
            value: ''
          }}
        />
        <LabeledInputField
          className="UpdateContact-country"
          label="Country"
          inputField={{
            id: 'UpdateContact-country',
            name: 'UpdateContact-country',
            type: 'text',
            onChangeHandler: () => { },
            value: ''
          }}
        />
      </div>
      <div className="UpdateContact-section UpdateContact-phone-number">
        {/* OOUUUUIIIIIAAAASSSSSSS */}
      </div>
    </div>
  );
}

export default UpdateContact;
