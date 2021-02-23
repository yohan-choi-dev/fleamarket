import React from 'react';
import { Link } from 'react-router-dom';
import './TransactionHistory.css';
import TransactionStatus from './TransactionStatus/TransactionStatus';

function TransactionHistory(props) {
  const { items, otherClassNames } = props;

  const list = items.map((item, index) => {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const date = new Date(item.date)
    return (
      <tr className="Traded-item" key={`Traded-item-${index}`}>
        <td>{item.item}</td>
        <td>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</td>
        <td><Link to={`/profile/${item.otherUserId}`}>{item.otherUserName}</Link></td>
      </tr>
    );
  });

  return (
    <div className={`TransactionHistory ${otherClassNames}`}>
      <h2>Trading History</h2>
      <div className="Content">
        <table className="TransactionHistory-table">
          <tr className="TransactionHistory-table-heading-row">
            <th>Item</th>
            <th>Date</th>
            <th>User</th>
          </tr>
          {list}
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
