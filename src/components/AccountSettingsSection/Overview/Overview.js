import React from 'react';
import { Link } from 'react-router-dom';
import './Overview.css';

function Overview(props) {
  const { profile } = props;

  return (
    <div className="Overview">
      <ul className="Overview-list">
        <li>
          <strong>Email: </strong>{profile.email}
        </li>
        <li>
          <strong>Name: </strong>{profile.name}
        </li>
        <li>
          <strong>Description: </strong>{profile.description}
        </li>
        <Link className="Overview-transaction-history" to="/trading-history">
          Trading History
        </Link>
      </ul>
    </div>
  );
}

export default Overview;
