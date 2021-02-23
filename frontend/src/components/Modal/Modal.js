import React from 'react';
import { useHistory } from 'react-router-dom';
import './Modal.css';

function Modal(props) {
  const history = useHistory();
  const { title, children } = props;
  return (
    <div className="Modal">
      <div
        className="Modal-background"
        onClick={e => {
          e.stopPropagation();
          history.goBack();
        }}
      ></div>
      <div className="Modal-content">
        <h2 className="Modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
