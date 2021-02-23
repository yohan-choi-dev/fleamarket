import React from 'react';

function TransactionStatus(props) {
  const { status } = props;

  if (status === 'Complete') {
    return (<p> {status}</p>);   // should be look like <Link to=?????> 
  } else
    return (<p> {status}</p>);
}

export default TransactionStatus;
