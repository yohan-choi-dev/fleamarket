import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../vars/style.css';
import './ItemCard.css';
import LikeButton from '../LikeButton/LikeButton';

// Contexts
import AppContext from '../../contexts/AppContext';

// API Route
import APIRoute from '../../vars/api-routes';

function ItemCard(props) {
  const { item } = props;

  const url = `http://localhost:12218/${item.ImageLinks[0].url}`;
  
  return (
    <div className="ItemCard">
      <Link to={`/item/${item.id}`}>
        <div className="ItemCard-item-image" style={{ backgroundImage: `url(${url})` }}></div>
        <div className="ItemCard-item-info">
          <h1 className="ItemCard-item-name">{item.name}</h1>
          {/* <p className="ItemCard-item-owner">
            posted by <span></span>
          </p> */}
          <img src={item.ImageLinks.url} />
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
