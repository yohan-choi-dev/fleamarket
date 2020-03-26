import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import './RecoverPasswordPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import LabeledInputField from '../../components/LabeledInputField/LabeledInputField';
import Button from '../../components/Button/Button';

// Utilities
import APIRoute from '../../vars/api-routes';
import { updateData } from '../../utils/fetch-data';

const RecoverPasswordPage = (props) => {
  const [userPassword, setUserPassword] = useState({
    content: '',
    isValid: false,
    borderStyle: 'none'
  });

  const [userPasswordConfirm, setUserPasswordConfirm] = useState({
    content: ''
  });

  const [passwordIsSame, setPasswordIsSame] = useState(false);
  const [isValid, setValid] = useState(false);

  const invalidBorderStyle = '2px solid #ff7e7e';

  const location = useLocation();
  const token = qs.parse(location.search).token;
  const userId = qs.parse(location.search).userId;

  // Effects
  useEffect(() => {
    const isSame = userPassword.content === userPasswordConfirm.content;
    setUserPassword({
      ...userPassword,
      borderStyle: isSame ? 'none' : invalidBorderStyle
    });
    setPasswordIsSame(isSame);
    // eslint-disable-next-line
  }, [userPassword.content, userPasswordConfirm]);

  useEffect(() => {
    setValid(userPassword.isValid && passwordIsSame);
    // eslint-disable-next-line
  }, [passwordIsSame]);

  // Handlers
  const sendPasswordUpdate = async (userId) => {
    const response = updateData(
      `${APIRoute}/api/users/${userId}`,
      JSON.stringify({
        newPassword: userPassword.content,
        token: token
      }),
      'application/json'
    );

    if (response.status >= 200 && response.status < 300) {
      window.alert(`Password reset successfully!`);
    }
  }
  const handleOnClick = (event) => {
    sendPasswordUpdate(userId);
  }

  return (
    <div className="RecoverPasswordPage">
      <Navigation />
      <div className="RecoverPasswordPage-main container">
        <h2 className="RecoverPasswordPage-main-heading">Reset your password</h2>
        <LabeledInputField
          label="Password"
          inputField={{
            id: 'RecoverAccount-password-input',
            name: 'RecoverAccount-password-input',
            type: 'password',
            placeholder: '••••••••••',
            required: true,
            autoFocus: false,
            style: {
              border: userPassword.borderStyle
            },
            onChangeHandler: event => {
              const userInput = event.target.value;
              const passwordIsValid = userInput.length >= 8;
              setUserPassword({
                ...userPassword,
                content: userInput,
                isValid: passwordIsValid
              });
            },
            value: userPassword.content
          }}
        />
        <LabeledInputField
          label="Confirm Password"
          inputField={{
            id: 'RecoverAccount-password-confirm-input',
            name: 'RecoverAccount-password-confirm-input',
            type: 'password',
            placeholder: '••••••••••',
            required: true,
            autoFocus: false,
            style: {
              border: userPassword.borderStyle
            },
            onChangeHandler: event => {
              const userInput = event.target.value;
              setUserPasswordConfirm({
                ...userPasswordConfirm,
                content: userInput
              });
            },
            value: userPasswordConfirm.content
          }}
        />
        <Button otherClassNames="purple" handleOnClick={handleOnClick} disabled={!isValid}>
          Reset Password
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default RecoverPasswordPage;