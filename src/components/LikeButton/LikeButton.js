import React from 'react';
import './LikeButton.css';
import { ReactComponent as HeartIcon } from '@fortawesome/fontawesome-free/svgs/solid/heart.svg';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ liked: !this.state.liked });
  };

  render() {
    let iconContainerStyle,
      iconStyle = {};
    if (!this.state.liked) {
      iconStyle = {
        fill: '#CCCCCC'
      };
      iconContainerStyle = {
        border: '2px solid #CCCCCC'
      };
    } else {
      iconStyle = {
        fill: '#8771A5',
        animation: 'like 0.2s'
      };
      iconContainerStyle = {
        border: '2px solid #8771A5'
      };
    }
    return (
      <div className="LikeButton">
        <div className="LikeButton-heart">
          <div
            onClick={this.handleClick}
            style={iconContainerStyle}
            className="LikeButton-heart-icon-container"
          >
            <HeartIcon style={iconStyle} className="LikeButton-heart-icon" />
          </div>
        </div>
      </div>
    );
  }
}

export default LikeButton;
