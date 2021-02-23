import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import './ValidatedInputField.css';

const ValidatedInputField = (props) => {
  const { classNames, id, name, type, placeholder, required, autoFocus, onChangeHandler, validateValue } = props;

  // States
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const firstUpdate = useRef(true);

  // Effects
  useEffect(() => {
    if (!firstUpdate.current) {
      // Check validation
      const valid = validateValue(value);
      setIsValid(valid);
    }

    // Call onChangeHandler from prop
    onChangeHandler(value);
  }, [value]);

  const validBorderStyle = 'none'; // no border
  const invalidBorderStyle = '2px solid #ff7e7e'; // red border

  return (
    <input
      className={classnames('ValidatedInputField', classNames)}
      id={id} type={type} name={name} placeholder={placeholder}
      required={required} autoFocus={autoFocus} style={{
        border: isValid ? validBorderStyle : invalidBorderStyle
      }}
      onChange={(e) => {
        firstUpdate.current = false;
        setValue(e.target.value);
      }}
      value={value}
    />
  )
}

export default ValidatedInputField;

/*
<ValidatedInputField
  label="Email"
  id='Email-test'
  name='Email-test'
  type='email'
  placeholder='example@email.com'
  required
  validateValue={(value) => {
    var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(value);
  }}
  onChangeHandler={value => {
    console.log(value);
  }}
/>
*/