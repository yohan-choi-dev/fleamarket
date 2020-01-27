import React from 'react';
import '../../vars/style.css';
import './Button.css';

class Button extends React.Component {
  render() {
    const { text, handleOnClick } = this.props;
    return (
      <button className="Button" onClick={handleOnClick}>
        {text}
      </button>
    );
  }
}

export default Button;
