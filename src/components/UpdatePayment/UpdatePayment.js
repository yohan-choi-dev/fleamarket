import React from 'react';
import Button from '../Button/Button';

function UpdatePayment() {
  return (
    <ul>
      <li> <b>Current Payment Information: </b>user.paymentInformation</li>
      <li> <Button>Update New Payment Information</Button></li>
    </ul>
  );

}

export default UpdatePayment;