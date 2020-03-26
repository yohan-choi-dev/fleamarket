import React from 'react';
import Button from '../../Button/Button';

function ChangePassword() {
  return (
    <div className="AccountSettingsSection-view-ChangePassword">
      <ul className="AccountSettingsSection-view-ChangePassword-list">
        <li>
          <strong>Current Password </strong>
        </li>
        <li>
          <input placeholder="•••••••••••••••" size="25" />
        </li>
        <li>
          <strong>New Password </strong>
        </li>
        <li>
          <input placeholder="•••••••••••••••" size="25" />
        </li>
        <li>
          <strong>Confirm New Password</strong>
        </li>
        <li>
          <input placeholder="•••••••••••••••" size="25" />
        </li>
        <li>
          <Button>Update password</Button>
        </li>
      </ul>
    </div>
  );
}

export default ChangePassword;
