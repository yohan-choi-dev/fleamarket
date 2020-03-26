import React from 'react';
import './TransactionHistory.css';
import TransactionStatus from './TransactionStatus/TransactionStatus';

function TransactionHistory(props) {
  const { items, otherClassNames } = props;

  const list = items.map(item => {
    return (
      <tr>
        <th>{item.name}</th>   {/*need to be a link*/}
        <th>{item.date}</th>
        <th>{item.buyer}</th>  {/*link to the user's profile*/}
        <th className={item.status}><TransactionStatus status={item.status} /></th>
      </tr>
    );
  });

  return (
    <div className={`TransactionHistory ${otherClassNames}`}>
      <h2>Transaction History</h2>
      <div className="Content">
        <table className="TransactionHistory-table">
          <tr className="TransactionHistory-table-heading-row">
            <th>Item</th>
            <th>Date</th>
            <th>User</th>
            <th>Status</th>
          </tr>
          {list}
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
