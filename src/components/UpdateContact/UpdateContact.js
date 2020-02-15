import React from 'react';
import './UpdateContact.css';

import LabeledInputField from '../LabeledInputField/LabeledInputField';

// function UpdateContact() {

//   return (
//     <ul>
//       <li> <b>Apartment Number</b><b>Building Number</b></li>
//       <li> <TextField text='' size='13' /><TextField text='' size='13' /></li>
//       <li> <b>Street Number</b>&emsp;&emsp;<b>Street Name</b></li>
//       <li> <TextField text='' size='10' /><TextField text='' size='25' /></li>
//       <li> <b>City/Town</b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<b>Province</b>&emsp;&emsp;<b>Postal Code</b>&emsp;&emsp;&emsp;&emsp;<b>Country</b></li>
//       <li> <TextField text='' size='9' /><TextField text='' size='5' /><TextField text='' size='9' /><TextField text='' size='9' /></li>
//       <li> <b>Phone Number</b></li>
//       <li> <TextField text='+1' size='2' /><TextField text='' size='25' /></li>
//       <li> <Button>Update Contact Information</Button></li>
//     </ul>
//   );

// }

function UpdateContact(props) {
  return (
    <div className="UpdateContact">
      <div className="UpdateContact-apartment">
        <LabeledInputField
          className="UpdateContact-apartment-number"
          label="Apartment Number"
          inputField={{
            id: 'UpdateContact-apartment-number',
            name: 'UpdateContact-apartment-number',
            type: 'number',
            autoFocus: true,
            onChangeHandler: () => {},
            value: ''
          }}
        />
        <LabeledInputField
          className="UpdateContact-building-number"
          label="Building Number"
          inputField={{
            id: 'UpdateContact-building-number',
            name: 'UpdateContact-building-number',
            type: 'number',
            onChangeHandler: () => {},
            value: ''
          }}
        />
      </div>
      <div className="UpdateContact-street">
        <LabeledInputField
          className="UpdateContact-street-number"
          label="Street Number"
          inputField={{
            id: 'UpdateContact-street-number',
            name: 'UpdateContact-street-number',
            type: 'number',
            onChangeHandler: () => {},
            value: ''
          }}
        />
        <LabeledInputField
          className="UpdateContact-street-name"
          label="Street Name"
          inputField={{
            id: 'UpdateContact-street-name',
            name: 'UpdateContact-street-name',
            type: 'text',
            onChangeHandler: () => {},
            value: ''
          }}
        />
      </div>
      <div className="UpdateContact-town">
        <LabeledInputField
          className="UpdateContact-city-town"
          label="City/Town"
          inputField={{
            id: 'UpdateContact-city-town',
            name: 'UpdateContact-city-town',
            type: 'text',
            onChangeHandler: () => {},
            value: ''
          }}
        />
        <LabeledInputField
          className="UpdateContact-province"
          label="Province"
          inputField={{
            id: 'UpdateContact-province',
            name: 'UpdateContact-province',
            type: 'text',
            onChangeHandler: () => {},
            value: ''
          }}
        />
        <LabeledInputField
          className="UpdateContact-postal-code"
          label="Postal Code"
          inputField={{
            id: 'UpdateContact-postal-code',
            name: 'UpdateContact-postal-code',
            type: 'text',
            onChangeHandler: () => {},
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
            onChangeHandler: () => {},
            value: ''
          }}
        />
      </div>
      <div className="UpdateContact-phone-number">{/* OOUUUUIIIIIAAAASSSSSSS */}</div>
    </div>
  );
}

export default UpdateContact;
