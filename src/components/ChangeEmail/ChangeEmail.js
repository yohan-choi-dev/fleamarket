import React from 'react';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';

function ChangeEmail(props) {
  const { profile } = props;
  return (
    <ul>
      <li>
        <b>Current: </b>{profile.email}
      </li>
      <li>
        <b>New Email: </b>
      </li>
      <li>
        <TextField text="example@gmail.com" size="25" />
      </li>
      <li>
        <Button>Update Email</Button>
      </li>
    </ul>
  );
}
export default ChangeEmail;
