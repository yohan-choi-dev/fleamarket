import React, { useState } from 'react';
import '../../vars/style.css';
import './ItemInfo.css';
import LikeButton from '../LikeButton/LikeButton';
import Button from '../Button/Button';

function ItemInfo(props) {
  const { item } = props;
  // const { appState } = useContext(AppContext);
  const [currentImage, setCurrentImage] = useState(0);

  const selectCurrentImage = (index) => {
    setCurrentImage(index);
  }

  const imageList = item.imageUrls.map((currentImageUrl, index) => {

    return (
      <li
        className={`ItemInfo-images-thumbnail-small ${index == currentImage ? 'active' : ''}`}
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
        <h2 className="ItemInfo-item-name">{item.name}</h2>
        <p className="ItemInfo-item-owner-name">{item.owner.name}</p>
        <p className="ItemInfo-item-description">{item.description}</p>
        {/* <LikeButton className='LikeButton' /> 90
          <div className="Item-Detail-Button">
            <Button>Contact User</Button>
          </div> */}
      </div>
    </div>
  );
}

export default ItemInfo;
