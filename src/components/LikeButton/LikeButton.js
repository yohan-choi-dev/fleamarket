import React, { useState, useEffect } from 'react';
import './LikeButton.css';
import { ReactComponent as HeartIcon } from '@fortawesome/fontawesome-free/svgs/solid/heart.svg';

const LikeButton = (props) => {
  const { likedByUser, onClickHandler } = props;

  const unlikeStyle = {
    iconStyle: {
      fill: '#CCCCCC'
    },
    iconContainerStyle: {
      border: '2px solid #CCCCCC'
    }
  }

  const likeStyle = {
    iconStyle: {
      fill: '#8771A5',
      animation: 'like 0.2s'
    },
    iconContainerStyle: {
      border: '2px solid #8771A5'
    }
  };

  const [liked, setLiked] = useState(likedByUser);
  const [heartStyle, setHeartStyle] = useState(likedByUser ? likeStyle : unlikeStyle);

  // Effects
  useEffect(() => {
    setHeartStyle(liked ? likeStyle : unlikeStyle);
    onClickHandler(liked);
  }, [liked]);

  const handleClick = () => {
    setLiked(!liked);
  }

  return (
    <div className="LikeButton">
      <div className="LikeButton-heart">
        <div
          onClick={handleClick}
          style={heartStyle.iconContainerStyle}
          className="LikeButton-heart-icon-container"
        >
          <HeartIcon style={heartStyle.iconStyle} className="LikeButton-heart-icon" />
        </div>
      </div>
    </div>
  )
}

export default LikeButton;
