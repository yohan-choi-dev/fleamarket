import React, { useState } from 'react';
import './RecoverAccountPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import LabeledInputField from '../../components/LabeledInputField/LabeledInputField';
import Button from '../../components/Button/Button';

function RecoverAccountPage(props) {
  const [userEmail, setUserEmail] = useState('');

  const handleOnClick = () => {
    // 1. Send a request to the recovery route on the server

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