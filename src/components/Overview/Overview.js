import React from 'react';
import { Link } from 'react-router-dom';
import './Overview.css';

function Overview() {
  return (
    <div className="Overview">
      <ul className="Overview-list">
        <li>
          <strong>Email: </strong>user.email
        </li>
        <li>
          <strong>Name: </strong>user.name
        </li>
        <li>
          <strong>Payment Information: </strong>user.paymentInformation
        </li>
        <li>
          <strong>Address: </strong>user.address
        </li>
        <Link className="Overview-transaction-history" to="/transaction-history">
          Transaction History
        </Link>
      </ul>
    </div>
  );
}

export default Overview;
