import React from 'react';
import LabeledInputField from '../LabeledInputField/LabeledInputField';
import LabeledTextField from '../LabeledTextField/LabeledTextField';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

import './UpdateUserProfile.css';

function UpdateUserProfile(props) {
  let name = 'userName';

  return (
    <div className="UpdateUserProfile">
      <Modal title="Update Profile">
       
        <LabeledInputField
          label="Name"
          inputField={{
            id: 'UpdateUserProfile-Name-Input',
            name: 'UpdateUserProfile-Name-Input',
            type: 'text',
            placeholder: '',
            required: false,
            style: {},
            onChangeHandler: event => {},
            value: name
          }}
        />
         <br></br>
        <LabeledTextField 
          label="Description"
        />

        <p>Profile Photo</p>
        
        <input type="file"></input>
        <br></br>
        <Button otherClassNames="purple">Update</Button>
        
      </Modal>
    </div>
  );
}

export default UpdateUserProfile;
