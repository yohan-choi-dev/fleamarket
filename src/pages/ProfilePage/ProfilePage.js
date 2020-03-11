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

function ProfilePage(props) {
  const { appState } = useContext(AppContext);

  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    async function fetchItemsByUser(userId) {
      const response = await fetch(`${APIRoute}/api/items?user=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        }
      });

      const body = await response.json();
      setUserItems(body);
    }
    fetchItemsByUser(appState.user.id);
  }, [appState.user.id]);

  return (
    <div className="ProfilePage">
      <Navigation />
      <ProfileCard profile={appState.user} />
      <div className="ProfilePage-user-items container">
        <h2>My items</h2>
        <div className="ProfilePage-user-items-content">
          {
            userItems.map((item, index) => (
              <ItemCard item={item} key={`ItemCard-${index}`} />
            ))
          }
        </div>
        <div className="ProfilePage-user-items-actions">
          <Link to="/upload-item">
            <Button otherClassNames="purple">
              Upload Item
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
