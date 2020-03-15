import React, { useState } from 'react';
import './RecoverAccountPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import LabeledInputField from '../../components/LabeledInputField/LabeledInputField';
import Button from '../../components/Button/Button';

import APIRoute from '../../vars/api-routes';

function RecoverAccountPage(props) {
  const [userEmail, setUserEmail] = useState('');

  const getRecoveryEmail = async () => {
    const response = await fetch(`${APIRoute}/api/auth/recover-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
      },
      body: JSON.stringify({
        email: userEmail
      })
    });

    if (response.status >= 200 && response.status < 300) {
      const body = await response.json();

      window.alert(`Recovery email sent successfully!`);
    }
  }

  console.log(APIRoute);

  const handleOnClick = (event) => {
    event.preventDefault();
    // 1. Send a request to the recovery route on the server
    getRecoveryEmail();
    // 2. Redirect user to a page that says it is successful lol

  }

  return (
    <div className="RecoverAccountPage">
      <Navigation />
      <div className="RecoverAccountPage-main container">
        <h2>Recover Your Account</h2>
        <div className="RecoverAccountPage-main-recover-section">
          <LabeledInputField
            label="Email"
            inputField={{
              id: 'RecoverAccount-email-input',
              name: 'RecoverAccount-email-input',
              type: 'email',
              placeholder: 'awesome_guy@email.com',
              required: true,
              onChangeHandler: event => {
                const userInput = event.target.value.trim();
                setUserEmail(userInput);
              },
              value: userEmail
            }}
          />
          <Button otherClassNames="purple" handleOnClick={handleOnClick}>
            Send Recovery Link
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RecoverAccountPage;