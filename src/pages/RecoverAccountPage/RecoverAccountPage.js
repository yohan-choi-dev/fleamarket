import React, { useState } from 'react';
import './RecoverAccountPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import LabeledInputField from '../../components/LabeledInputField/LabeledInputField';
import Button from '../../components/Button/Button';

// Utilities
import APIRoute from '../../vars/api-routes';
import { postData } from '../../utils/fetch-data';

function RecoverAccountPage(props) {
  const [userEmail, setUserEmail] = useState('');

  const getRecoveryEmail = async () => {
    const response = await postData(
      `${APIRoute}/api/auth/recover-account`,
      JSON.stringify({
        email: userEmail
      }),
      'application/json'
    );

    if (response.status >= 200 && response.status < 300) {
      window.alert(`Recovery email sent successfully!`);
    }
  }

  const handleOnClick = (event) => {
    event.preventDefault();
    // Send a request to the recovery route on the server
    getRecoveryEmail();
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