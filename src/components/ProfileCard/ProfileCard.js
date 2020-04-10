import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ProfileCard.css';

// Components
import Button from '../Button/Button';

// API Route
import APIRoute from '../../vars/api-routes';

function ProfileCard(props) {
  const { profile } = props;
  const location = useLocation();

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
            <p className="ProfileCard-profile-rating"><strong>Rating</strong>: 4.5/5</p>
            <p className="ProfileCard-profile-description">{profile.description}</p>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;