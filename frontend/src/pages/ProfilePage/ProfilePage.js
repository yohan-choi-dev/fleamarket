import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';
import APIRoute from '../../vars/api-routes';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Navigation from '../../components/Navigation/Navigation';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ItemCard from '../../components/ItemCard/ItemCard';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

// Utilities
import { getData } from '../../utils/fetch-data';

function ProfilePage(props) {
  // Context
  const { appState } = useContext(AppContext);

  // State
  const [items, setItems] = useState([]);

  // Actions
  const fetchItemsByUser = async (userId) => {
    const response = await getData(`${APIRoute}/api/items?user=${userId}`);
    setItems(response);
  }

  useEffect(() => {
    fetchItemsByUser(appState.user.id);
  }, [appState.user.id]);

  return (
    <div className="ProfilePage">
      <Navigation />
      <ProfileCard profile={appState.user} />
      <div className="ProfilePage-user-items-actions">
        <Link to="/upload-item">
          <Button otherClassNames="purple">
            Upload Item
          </Button>
        </Link>
      </div>
      <div className="ProfilePage-user-items container">
        <h2>My items</h2>
        <div className="ProfilePage-user-items-content">
          {
            items.map((item, index) => (
              <ItemCard item={item} key={`ItemCard-${index}`} showLikeButton={false} />
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
