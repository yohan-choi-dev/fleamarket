import React from 'react';

import '../../vars/style.css';

function TranscationStatus(props) {
  const { status } = props;

  if (status == 'Complete') {
    return (<p> {status}</p>);   // should be look like <Link to=?????> 
  } else 
  return (<p> {status}</p>);
}

export default TranscationStatus;
