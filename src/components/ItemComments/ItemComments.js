import React from 'react';
import '../../vars/style.css';
import './ItemComments.css';

    function ItemComments(props) {
  const { comments } = props;
  return (
    <div>
     <div className="Itemcomments">
      <div className="Itemcomments-comments-info">
        <h1 className="Itemcomments-comments-picture">{comments.picture}</h1>
        <h1 className="Itemcomments-comments-name">{comments.name}</h1>
        <h2 className="Itemcomments-comments-rating">{comments.rating}</h2>
        <p className="Itemcomments-comments-description">{comments.description}</p>
      </div>
      </div>
    </div>
  );
}

export default ItemComments;