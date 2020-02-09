import React from 'react';
import TextField from '../TextField/TextField';
import ButtonPurple from '../ButtonPurple/ButtonPurple';

function ChangePassword() {
  return (
    <ul>
      <li>
        <b>Current Password </b>user.email
      </li>
      <li>
        <TextField text="***********" size="25" />
      </li>
      <li>
        <b>New Password </b>
      </li>
      <li>
        <TextField text="***********" size="25" />
      </li>
      <li>
        <b>Confirm New Password</b>
      </li>
      <li>
        <TextField text="***********" size="25" />
      </li>
      <li>
        <ButtonPurple text="Update password" />
      </li>
    </ul>
  );
}

export default ChangePassword;
