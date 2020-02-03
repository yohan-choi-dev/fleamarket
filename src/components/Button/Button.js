import React from 'react';
import '../../vars/style.css';
import './Button.css';

class Button extends React.Component {
  render() {
    const { handleOnClick, type, children } = this.props;
    return (
      <button className="Button" onClick={handleOnClick} type={type}>
        {children}
      </button>
    );
  }
}

export default Button;
