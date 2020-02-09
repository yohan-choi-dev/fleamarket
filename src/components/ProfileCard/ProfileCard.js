import React from 'react';
import '../../vars/style.css';
import './ProfileCard.css';

    function ProfileCard(props) {
  const { profile } = props;
  return (
    <div>
     <div className="profileCard">
      <div
        className="ProfileCard-profile-image"
        style={{
          backgroundImage: `url(${profile.imageUrl})`
        }}
      ></div>
      <div className="ProfileCard-profile-info">
        <h1 className="ProfileCard-profile-name">{profile.name}</h1>
        <h2 className="ProfileCard-profile-rating">{profile.rating}</h2>
        <p className="ProfileCard-profile-description">{profile.description}</p>
      </div>
      </div>
    </div>
  );
}

export default ProfileCard;