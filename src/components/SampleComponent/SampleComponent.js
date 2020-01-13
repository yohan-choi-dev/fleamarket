import React from 'react';
import './SampleComponent.css';

function SampleComponent(props) {
  const { customText } = props;
  return (
    <div className="SampleComponent">
      This is a sample component
      {customText}
    </div>
  );
}

export default SampleComponent;