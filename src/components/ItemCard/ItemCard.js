import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ItemCard.css';
import LikeButton from '../LikeButton/LikeButton';

// Contexts
import AppContext from '../../contexts/AppContext';

// Utilities
import APIRoute from '../../vars/api-routes';

function ItemCard(props) {
  const { item, handleLikedStatus, showLikeButton } = props;

  // Context
  const { appState } = useContext(AppContext);

  return (
    <div className="ItemCard">
      <Link to={`/item/${item.id}`}>
        <div className="ItemCard-item-image" style={{ backgroundImage: `url(${APIRoute}/${item.imageUrls[0]})` }}></div>
        <div className="ItemCard-item-info">
          <h1 className="ItemCard-item-name">{item.name}</h1>
          <p className="ItemCard-item-owner">
            posted by <span>{item.userName}</span>
          </p>
          <p className="ItemCard-item-description">{item.description}</p>
        </div>
      </Link>
      {
        appState.user.isLoggedIn && showLikeButton ?
          (
            <div className="ItemCard-LikeButton-container">
              <LikeButton onClickHandler={() => {
                showLikeButton && handleLikedStatus(!item.favoritedByUser, item.id);
              }} likedByUser={item.favoritedByUser} />
            </div>
          ) : ''
      }
    </div>
  );
}

export default ItemCard;
