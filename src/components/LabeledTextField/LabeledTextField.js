import React from 'react';
import './LabeledTextField.css';

function LabeledTextField(props) {
  const { onChangeHandler, textFieldValue } = props;
  return (
    <div className="LabeledTextField">
      <textarea onChange={onChangeHandler} value={textFieldValue} />
    </div>
  );
}

export default LabeledTextField;