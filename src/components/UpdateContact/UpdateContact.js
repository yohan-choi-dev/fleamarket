import React from 'react';
import TextField from '../TextField/TextField';
import ButtonPurple from '../ButtonPurple/ButtonPurple';
import './UpdateContact.css';

function UpdateContact() {
  //will be display user's current info in the placeholder
  return (
    <ul>
        <li> <b>Apartment Number</b><b>Building Number</b></li>
        <li> <TextField text='' size='13'/><TextField text='' size='13'/></li>
        <li> <b>Street Number</b>&emsp;&emsp;<b>Street Name</b></li>
        <li> <TextField text='' size='10'/><TextField text='' size='25'/></li>
        <li> <b>City/Town</b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<b>Province</b>&emsp;&emsp;<b>Postal Code</b>&emsp;&emsp;&emsp;&emsp;<b>Country</b></li>
        <li> <TextField text='' size='9'/><TextField text='' size='5'/><TextField text='' size='9'/><TextField text='' size='9'/></li>
        <li> <b>Phone Number</b></li>
        <li> <TextField text='+1' size='2'/><TextField text='' size='25'/></li>
        <li> <ButtonPurple text='Update Contact Information'/></li>
    </ul>
  );

}

export default UpdateContact;