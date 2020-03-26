import React from 'react';
import './DropdownButton.css';

function DropdownButton(props) {
  const { onChangeHandler, options } = props;
  return (
    <div className="DropdownButton">
      <select className="DropdownButton-select" onChange={onChangeHandler}>
        {
          options.map(option => (
            <option value={`${option.value}`}>{option.label}</option>
          ))
        }
      </select>
    </div>
  );
}

export default DropdownButton;
