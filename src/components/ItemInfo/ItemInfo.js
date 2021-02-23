import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ItemInfo.css';

// Components
import LikeButton from '../LikeButton/LikeButton';
import Button from '../Button/Button';

// Contexts
import AppContext from '../../contexts/AppContext';

function ItemInfo(props) {
  const { item } = props;
  const [currentImage, setCurrentImage] = useState(0);

  const { appState } = useContext(AppContext);

  const selectCurrentImage = (index) => {
    setCurrentImage(index);
  }

  const imageList = item.imageUrls.map((currentImageUrl, index) => {
    return (
      <li
        className={`ItemInfo-images-thumbnail-small ${index === currentImage ? 'active' : ''}`}
        onClick={() => selectCurrentImage(index)}
        style={{
          backgroundImage: `url(${currentImageUrl})`
        }}
        key={`current-item-image-${index}`}
      >
      </li>
    );
  });

  return (
    <div className="ItemInfo">
      <div className="ItemInfo-images">
        <div style={{
          backgroundImage: `url(${item.imageUrls[currentImage]})`
        }} className="ItemInfo-images-big"></div>
        <ul className="ItemInfo-images-thumbnails">{imageList}</ul>
      </div>

      <div className="ItemInfo-item-details">
        <div className="ItemInfo-item-details-info">
          <h2 className="ItemInfo-item-name">{item.name}</h2>
          <p className="ItemInfo-item-owner-name">by <Link to={`/profile/${item.owner.id}`}>{item.owner.name}</Link></p>
          <p className="ItemInfo-item-description">{item.description}</p>
        </div>
        {
          item.owner.id != appState.user.id && <div className="ItemInfo-contact-owner">
            <Link to={{
              pathname: '/chatroom',
              state: {
                otherUser: item.owner
              }
            }}><Button otherClassName="purple">Contact User</Button></Link>
          </div>
        }
      </div>
    </div>
  );
}

export default ItemInfo;
