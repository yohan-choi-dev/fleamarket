import React from 'react';
import './DropdownButton.css';

function DropdownButton(props) {
  const { onChangeHandler } = props;
  return (
    <div className="DropdownButton">
      <select className="DropdownButton-select" onChange={onChangeHandler}>
        <option value="Category">Category&nbsp;</option>
        <option value="Electronics">Electronics&nbsp;</option>
        <option value="Apparels">Apparels&nbsp;</option>
        <option value="Books">Books&nbsp;</option>
      </select>
    </div>
  );
}

export default DropdownButton;
