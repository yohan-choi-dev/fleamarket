import React, { useState } from 'react';
import './AccountSettingsSection.css';

import AccountSettingsSidebar from './AccountSettingsSidebar/AccountSettingsSidebar';
import Overview from './Overview/Overview';
import ChangeEmail from './ChangeEmail/ChangeEmail';
import UpdateContact from './UpdateContact/UpdateContact';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import ChangePassword from './ChangePassword/ChangePassword';

function AccountSettingsSection(props) {
  const { profile } = props;
  const [accountSettingsView, setAccountSettingsView] = useState(0);

  const views = [
    <Overview profile={profile} />,
    <ChangeEmail profile={profile} />,
    <ChangePassword />,
    <UpdateContact />,
    <DeleteAccount />
  ]

  const handleSelection = selection => {
    setAccountSettingsView(selection);
  };

  return (
    <div className="AccountSettingsSection">
      <AccountSettingsSidebar onSelectionHandler={handleSelection} />
      <div className="AccountSettingsSection-view">{views[accountSettingsView]}</div>
    </div>
  );
}

export default AccountSettingsSection;
