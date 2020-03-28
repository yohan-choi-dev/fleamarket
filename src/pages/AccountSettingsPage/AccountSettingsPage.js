import React, { useContext, useEffect, useState } from 'react';
import './AccountSettingsPage.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import AccountSettingsSection from '../../components/AccountSettingsSection/AccountSettingsSection';
import Footer from '../../components/Footer/Footer';

// Utilities
import { getData } from '../../utils/fetch-data';
import APIRoute from '../../vars/api-routes';

function AccountSettingsPage(props) {
  const { appState } = useContext(AppContext);

  const [currentUser, setCurrentUser] = useState({
    id: 0,
    name: '',
    description: '',
    email: '',
    image: '',
    liked: 0,
    disliked: 0,
    aptNumber: 0,
    buildingNumber: 0,
    streetNumber: 0,
    streetName: '',
    city: '',
    province: '',
    postalCode: '',
    country: ''
  });

  const fetchUserInformation = async (userId) => {
    const userInfo = await getData(`${APIRoute}/api/users/${userId}`);
    setCurrentUser(userInfo);
  }

  useEffect(() => {
    fetchUserInformation(appState.user.id);
  }, []);

  return (
    <div className="AccountSettingsPage">
      <Navigation />
      <ProfileCard profile={appState.user} />
      <div className="AccountSettingsPage-settings container">
        <h2>Account Settings</h2>
        <AccountSettingsSection profile={currentUser} />
      </div>
      <Footer />
    </div>
  )
}

export default AccountSettingsPage;