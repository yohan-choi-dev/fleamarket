import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './LabeledInputField.css';

function LabeledInputField(props) {
  const { className, label, inputField, labeled } = props;
  const { classNames, id, name, type, placeholder, required, autoFocus, style, onChangeHandler, value } = inputField;
  return (
    <div className={classnames('LabeledInputField', className)}>
      {labeled ? <label className="LabeledInputField-label" htmlFor={id}>
        {label}
      </label> : ''}
      <input
        className={classnames('LabeledInputField-input', classNames)}
        id={id} type={type} name={name} placeholder={placeholder}
        required={required} autoFocus={autoFocus} style={style}
        onChange={onChangeHandler}
        value={value}
      />
    </div>
  );
}

LabeledInputField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  labeled: PropTypes.bool,
  inputField: PropTypes.shape({
    classNames: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    autoFocus: PropTypes.bool,
    style: PropTypes.object,
    onChangeHandler: PropTypes.func,
    value: PropTypes.string
  })
}

LabeledInputField.defaultProps = {
  labeled: true
};

export default LabeledInputField;