import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProfileCard.css';

// Components
import Button from '../Button/Button';

// Contexts
import AppContext from '../../contexts/AppContext';

// API Route
import APIRoute from '../../vars/api-routes';
import { getData } from '../../utils/fetch-data';

function ProfileCard(props) {
  const { profile } = props;
  const location = useLocation();

  const { appState } = useContext(AppContext);

  const [userRate, setUserRate] = useState(0);

  const getUserRate = async (userId) => {
    const response = await getData(`${APIRoute}/api/users/rate/${userId}`);
    setUserRate(response.rate);
  }

  useEffect(() => {
    if (profile.id) {
      getUserRate(profile.id);
    }
  }, [profile.id]);

  return (
    <div className="ProfileCard container">
      <div className="ProfileCard-content">
        <div
          className="ProfileCard-profile-image"
        >
          <div style={{
            backgroundImage: `url(${APIRoute}/${profile.image})`
          }}></div>
        </div>
        <div className="ProfileCard-profile-info">
          <div>
            <h2 className="ProfileCard-profile-name">{profile.name}</h2>
            <p className="ProfileCard-profile-rating"><strong>Rating</strong>: {userRate}/5</p>
            <p className="ProfileCard-profile-description">{profile.description}</p>
          </div>
          {
            (profile.id == appState.user.id) &&
            <Link to={{
              pathname: `/profile-edit`,
              state: {
                background: location,
                user: {
                  id: profile.id,
                  name: profile.name,
                  description: profile.description
                }
              }
            }} className="ProfileCard-actions">
              <Button>Edit Profile</Button>
            </Link>
          }
          {
            (profile.id != appState.user.id) &&
            <Link to={{
              pathname: '/chatroom',
              state: {
                otherUser: profile
              }
            }}><Button>Contact User</Button></Link>
          }
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;