import React, { useState } from 'react';
import './AccountSettingsSection.css';
import '../../vars/style.css';

import AccountSettingsSidebar from '../AccountSettingsSidebar/AccountSettingsSidebar';

import Overview from '../Overview/Overview';
import ChangeEmail from '../ChangeEmail/ChangeEmail';
import UpdateContact from '../UpdateContact/UpdateContact';
import UpdatePayment from '../UpdatePayment/UpdatePayment';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import ChangePassword from '../ChangePassword/ChangePassword';

function AccountSettingsSection(props) {
  const { profile } = props;
  const [accountSettingsView, setAccountSettingsView] = useState(
    <Overview profile={profile} />
  );

  const handleSelection = selection => {
    switch (selection) {
      case 0:
        setAccountSettingsView(<Overview profile={profile} />);
        break;
      case 1:
        setAccountSettingsView(<ChangeEmail profile={profile} />);
        break;
      case 2:
        setAccountSettingsView(<ChangePassword />);
        break;
      case 3:
        setAccountSettingsView(<UpdateContact />);
        break;
      case 4:
        setAccountSettingsView(<UpdatePayment />);
        break;
      case 5:
        setAccountSettingsView(<DeleteAccount />);
        break;
    }
  };

  return (
    <div className="AccountSettingsSection">
      <AccountSettingsSidebar onSelectionHandler={handleSelection} />
      <div className="AccountSettingsSection-view">{accountSettingsView}</div>
    </div>
  );
}

export default AccountSettingsSection;
