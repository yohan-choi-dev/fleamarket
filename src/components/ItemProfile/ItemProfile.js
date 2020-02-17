import React from 'react';
import '../../vars/style.css';
import './ItemProfile.css';

    function ItemProfile(props) {
  const { item } = props;
  return (
    <div>
     <div className="ItemProfile">
      <div
        className="ItemProfile-profile-image"
        style={{
          backgroundImage: `url(${item.imageUrl})`
        }}
      ></div>
      <div className="ItemProfile-item-info">
        <h1 className="ItemProfile-item-pic">{item.pic}</h1>
        <h1 className="ItemProfile-item-name">{item.name}</h1>
        <h2 className="ItemProfile-item-from">{item.from}</h2>
        <p className="ItemProfile-item-description">{item.description}</p>
        <h2 className="ItemProfile-item-rate">{item.rate}</h2>
      </div>
      </div>
    </div>
  );
}

export default ItemProfile;