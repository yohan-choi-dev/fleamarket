import React, { useState } from 'react';
import Button from '../../Button/Button';

import ValidatedInputField from '../../ValidatedInputField/ValidatedInputField';

// Utilities
import { updateData } from '../../../utils/fetch-data';
import APIRoute from '../../../vars/api-routes';

function ChangeEmail(props) {
  const { profile } = props;

  const [newEmail, setNewEmail] = useState('');

  const updateEmail = async () => {
    const response = await updateData(
      `${APIRoute}/api/users/${profile.id}`,
      JSON.stringify({
        newEmail: newEmail
      }),
      'application/json'
    );
    setNewEmail('');

    window.alert('A verification email has been sent to your new email address.');
  }

  return (
    <ul>
      <li>
        <b>Current: </b>{profile.email}
      </li>
      <li>
        <p><strong>New email: </strong></p>
        <ValidatedInputField
          label="Email"
          id='Email-test'
          name='Email-test'
          type='email'
          placeholder='example@email.com'
          required
          validateValue={(value) => {
            var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return emailRegex.test(value);
          }}
          onChangeHandler={value => {
            setNewEmail(value);
          }}
        />
      </li>
      <li>
        <Button handleOnClick={updateEmail}>Update Email</Button>
      </li>
    </ul>
  );
}
export default ChangeEmail;
