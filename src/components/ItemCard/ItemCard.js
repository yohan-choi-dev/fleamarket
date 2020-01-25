import React from 'react';
import '../../vars/style.css';
import './ItemCard.css';
import LikeButton from '../LikeButton/LikeButton';

function ItemCard(props) {
  const { item } = props;
  return (
    <div className="ItemCard">
      <div
        className="ItemCard-item-image"
        style={{
          backgroundImage: `url(${item.imageUrl})`
        }}
      ></div>
      <div className="ItemCard-item-info">
        <h1 className="ItemCard-item-name">{item.name}</h1>
        <p className="ItemCard-item-owner">
          posted by <span>{item.owner}</span>
        </p>
        <p className="ItemCard-item-description">{item.description}</p>
        <div className="ItemCard-LikeButton-container">
          <LikeButton />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
