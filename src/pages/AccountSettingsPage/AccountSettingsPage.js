import React, { useContext } from 'react';
import './AccountSettingsPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import AccountSettingsSection from '../../components/AccountSettingsSection/AccountSettingsSection';
import Footer from '../../components/Footer/Footer';

function AccountSettingsPage(props) {
  const { appState } = useContext(AppContext);

  return (
    <div className="AccountSettingsPage">
      <Navigation />
      <ProfileCard profile={appState.user} />
      <div className="AccountSettingsPage-settings container">
        <h2>Account Settings</h2>
        <AccountSettingsSection profile={appState.user} />
      </div>
      <Footer />
    </div>
  )
}

export default AccountSettingsPage;