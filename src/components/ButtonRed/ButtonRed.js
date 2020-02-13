import React from 'react';
import './BottonRed.css';
import Button from '../Button/Button';

function BottonRed(props) {
  return (
    <div className="BottonRed">
      <Button className="button">{props.text}</Button>
    </div>
  );
}

export default BottonRed;
