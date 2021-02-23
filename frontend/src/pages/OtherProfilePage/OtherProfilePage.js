import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './OtherProfilePage.css';
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

function OtherProfilePage(props) {
  // Context
  const { appState } = useContext(AppContext);
  const { userId } = useParams();

  // State
  const [items, setItems] = useState([]);
  const [otherUser, setOtherUser] = useState({});

  // Actions
  const fetchItemsByUser = async (userId) => {
    const response = await getData(`${APIRoute}/api/items?user=${userId}`);
    setItems(response);
  }

  const fetchOtherUser = async (userId) => {
    const response = await getData(`${APIRoute}/api/users/${userId}`);
    setOtherUser(response);
  }

  useEffect(() => {
    fetchOtherUser(userId)
    fetchItemsByUser(userId);
  }, [userId]);

  return (
    <div className="ProfilePage">
      <Navigation />
      <ProfileCard profile={otherUser} />
      <div className="ProfilePage-user-items container">
        <h2>{otherUser.name}'s items</h2>
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

export default OtherProfilePage;
