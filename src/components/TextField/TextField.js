import React from 'react';
import './TextField.css'

function TextField(props) {
  
  return (
  <input className="textField"placeholder={props.text} size={props.size}></input>
  );

}

export default TextField;