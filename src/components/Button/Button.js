import React from 'react';
import '../../vars/style.css';
import './Button.css';

class Button extends React.Component {
  render() {
    const { handleOnClick, children, otherClassNames } = this.props;
    return (
      <button className={`Button ${otherClassNames}`} onClick={handleOnClick}>
        {children}
      </button>
    );
  }
}

export default Button;
