import React from 'react';
import '../../vars/style.css';
import './ItemComments.css';

    function ItemComments(props) {
  const { comments } = props;
  return (
    <div>
     <div className="ItemComments">
      <div className="ItemComments-comments-info">
        <h1 className="ItemComments-comments-picture">{comments.picture}</h1>
        <h1 className="ItemComments-comments-name">{comments.name}</h1>
        <h2 className="ItemComments-comments-rating">{comments.rating}</h2>
        <p className="ItemComments-comments-description">{comments.description}</p>
      </div>
      </div>
    </div>
  );
}

export default ItemComments;