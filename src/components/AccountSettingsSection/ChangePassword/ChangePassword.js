import React, { useState } from 'react';
import './ChangePassword.css';

// Components
import Button from '../../Button/Button';
import ValidatedInputField from '../../ValidatedInputField/ValidatedInputField';

// Utilities
import APIRoute from '../../../vars/api-routes';
import { updateData } from '../../../utils/fetch-data';

function ChangePassword(props) {
  const { profile } = props;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const updatePassword = async () => {
    if (newPassword === confirmNewPassword) {
      const response = await updateData(
        `${APIRoute}/api/users/${profile.id}`,
        JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword
        }),
        'application/json'
      );

      // Current password not correct
      if (response.status !== 200) {
        window.alert(response.message);
      } else {
        window.alert('Password changed successfully!');
      }
    } else {
      window.alert('New password fields must match!');
    }

  }

  return (
    <div className="AccountSettingsSection-view-ChangePassword">
      <div className="ChangePassword-input">
        <p><strong>Current Password *</strong></p>
        <ValidatedInputField
          id='ChangePassword-CurrentPassword'
          name='ChangePassword-CurrentPassword'
          type='password'
          placeholder='•••••••••••••••'
          required
          validateValue={(value) => {
            return value.length > 0;
          }}
          onChangeHandler={value => {
            setCurrentPassword(value);
          }}
        />
      </div>
      <div className="ChangePassword-input">
        <p><strong>New Password *</strong></p>
        <ValidatedInputField
          id='ChangePassword-NewPassword'
          name='ChangePassword-NewPassword'
          type='password'
          placeholder='•••••••••••••••'
          required
          validateValue={(value) => {
            const valid = value.length >= 8;
            return valid;
          }}
          onChangeHandler={value => {
            setNewPassword(value);
          }}
        />
      </div>
      <div className="ChangePassword-input">
        <p><strong>Confirm New Password *</strong></p>
        <ValidatedInputField
          id='ChangePassword-CurrentPassword'
          name='ChangePassword-CurrentPassword'
          type='password'
          placeholder='•••••••••••••••'
          required
          validateValue={(value) => {
            const valid = value === newPassword;
            return valid;
          }}
          onChangeHandler={value => {
            setConfirmNewPassword(value);
          }}
        />
      </div>
      <Button otherClassNames={'purple'} handleOnClick={updatePassword}>
        Update Email
      </Button>
    </div>
  );
}

export default ChangePassword;
