import React from 'react';
import './LabeledTextField.css';

function LabeledTextField(props) {
  const { onChangeHandler, textFieldValue, label, id } = props;
  return (
    <div className="LabeledTextField">
      <label className="LabeledTextField-label" htmlFor={id}>
        {label}
      </label>
      <textarea onChange={onChangeHandler} value={textFieldValue} />
    </div>
  );
}

export default LabeledTextField;