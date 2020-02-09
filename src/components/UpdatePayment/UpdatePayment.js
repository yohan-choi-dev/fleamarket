import React from 'react';
import ButtonPurple from '../ButtonPurple/ButtonPurple';

function UpdatePayment() {
  
  return (
    <ul>
        <li> <b>Current Payment Information: </b>user.paymentInformation</li>
        <li> <ButtonPurple text='Update New Payment Information'/></li>
    </ul>
  );

}

export default UpdatePayment;