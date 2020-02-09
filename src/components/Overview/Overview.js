import React from 'react';
import ClickableLink from '../ClickableLink/ClickableLink';

function Overview() {
  return (
    <div className="Overview">
      <ul>
        <li>
          <b>Email: </b>user.email
        </li>
        <li>
          <b>Name: </b>user.name
        </li>
        <li>
          <b>Payment Information: </b>user.paymentInformation
        </li>
        <li>
          <b>Address: </b>user.address
        </li>
      </ul>
      <ClickableLink>Transaction History</ClickableLink>
    </div>
  );
}

export default Overview;
