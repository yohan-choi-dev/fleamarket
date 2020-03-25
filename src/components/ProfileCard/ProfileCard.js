import React from 'react';
import '../../vars/style.css';
import './ProfileCard.css';

// API Route
import APIRoute from '../../vars/api-routes';

function ProfileCard(props) {
  const { profile } = props;
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
          <h2 className="ProfileCard-profile-name">{profile.name}</h2>
          <p className="ProfileCard-profile-rating"><strong>Rating</strong>: 4.5/5</p>
          <p className="ProfileCard-profile-description">{profile.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;