import React from 'react';
import './BottonPurple.css';
import Button from '../Button/Button';

function BottonPurple(props) {
  return (
    <div className="BottonPurple">
      <Button className="button">{props.text}</Button>
    </div>
  );
}

export default BottonPurple;
