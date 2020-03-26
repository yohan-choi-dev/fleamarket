import React from 'react';
import './Button.css';

class Button extends React.Component {
  render() {
    const { handleOnClick, children, otherClassNames, disabled } = this.props;
    return (
      <button className={`Button ${otherClassNames}`} onClick={handleOnClick} disabled={disabled}>
        {children}
      </button>
    );
  }
}

export default Button;
