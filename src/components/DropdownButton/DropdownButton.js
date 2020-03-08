import React from 'react';
import './DropdownButton.css';

function DropdownButton(props) {
  const { onChangeHandler } = props;
  return (
    <div className="DropdownButton">
      <select className="DropdownButton-select" onChange={onChangeHandler}>
        <option value="0">Category&nbsp;</option>
        <option value="1">Electronics&nbsp;</option>
        <option value="2">Apparels&nbsp;</option>
        <option value="3">Books&nbsp;</option>
      </select>
    </div>
  );
}

export default DropdownButton;