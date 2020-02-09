import React from 'react';
import TextField from '../TextField/TextField';
import ButtonPurple from '../ButtonPurple/ButtonPurple';

function ChangeEmail() {
  return (
    <ul>
      <li>
        <b>Current: </b>user.email
      </li>
      <li>
        <b>New Email: </b>
      </li>
      <li>
        <TextField text="example@gmail.com" size="25" />
      </li>
      <li>
        <ButtonPurple text="Update Email" />
      </li>
    </ul>
  );
}
export default ChangeEmail;
