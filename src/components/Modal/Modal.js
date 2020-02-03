import React from 'react';
import './Modal.css';

function Modal(props) {
  const { title, children } = props;
  return (
    <div className="Modal">
      <div className="Modal-content">
        <h2 className="Modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
