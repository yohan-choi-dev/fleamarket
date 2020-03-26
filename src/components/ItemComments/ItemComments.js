import React from 'react';
import './ItemComments.css';

function ItemComments(props) {
  const { comments } = props;
  return (
    <div>
      <div className="ItemComments">
        <div className="ItemComments-comments-info">
          <img className="ItemComments-comments-picture" width="42" height="42">{comments.picture}</img>
          <h4 className="ItemComments-comments-name">{comments.name}</h4>
          <h2 className="ItemComments-comments-rating">{comments.rating}</h2>
          <p className="ItemComments-comments-description">{comments.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemComments;