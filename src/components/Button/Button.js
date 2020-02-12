import React from 'react';
import '../../vars/style.css';
import './Button.css';

class Button extends React.Component {
  render() {
    const { handleOnClick, children, ...otherProps } = this.props;
    return (
      <button className="Button" onClick={handleOnClick} {...otherProps}>
        {children}
      </button>
    );
  }
}

export default Button;
