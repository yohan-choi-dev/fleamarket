import React from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css';
import LikeButton from '../LikeButton/LikeButton';

// API Route
import APIRoute from '../../vars/api-routes';

function ItemCard(props) {
  const { item } = props;

  const url = `${APIRoute}/${item.imageUrls[0]}`;

  return (
    <div className="ItemCard">
      <Link to={`/item/${item.id}`}>
        <div className="ItemCard-item-image" style={{ backgroundImage: `url(${url})` }}></div>
        <div className="ItemCard-item-info">
          <h1 className="ItemCard-item-name">{item.name}</h1>
          <p className="ItemCard-item-owner">
            posted by <span>{item.userName}</span>
          </p>
          {/* <img src={item.url} /> */}
          <p className="ItemCard-item-description">{item.description}</p>
          <div className="ItemCard-LikeButton-container">
            <LikeButton />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemCard;
