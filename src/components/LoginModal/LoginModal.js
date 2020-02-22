import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import './LoginModal.css';

import AppContext from '../../contexts/AppContext';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import LabeledInputField from '../LabeledInputField/LabeledInputField';

function LoginModal(props) {
  const cookies = new Cookies();
  // Constants
  const emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const invalidBorderStyle = '2px solid #ff7e7e';

  // States
  const [userEmail, setUserEmail] = useState({
    content: '',
    isValid: false,
    borderStyle: 'none'
  });
  const [userPassword, setUserPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  // Contexts
  const { appState, setAppState } = useContext(AppContext);

  // Hooks
  const history = useHistory();

  // Effects
  useEffect(() => {
    setFormIsValid(userEmail.isValid && userPassword != '');
  }, [userEmail, userPassword]);

  // Event handlers
  const handleOnClick = async event => {
    event.preventDefault();
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
      },
      body: JSON.stringify({
        email: userEmail.content,
        password: userPassword
      })
    });

    if (response.status != 200) {
      history.push('/login-error');
    } else {
      const body = await response.json();
      history.push('/');

      // set login cookie
      cookies.set('fleamarket-authentication', {
        username: body.name,
        token: body.token,
        isLoggedIn: true
      });

      setAppState({
        ...appState,
        user: {
          ...appState.user,
          isLoggedIn: true,
          name: body.name
        }
      });
    }
  };

  return (
    <div className="LoginModal">
      <Modal className="LoginModal-modal" title="Login to your account">
        <form className="LoginModal-form">
          <div className="LoginModal-input-fields">
            <LabeledInputField
              label="Email"
              inputField={{
                id: 'LoginModal-email-input',
                name: 'LoginModal-email-input',
                type: 'email',
                required: true,
                autoFocus: true,
                style: {
                  border: userEmail.borderStyle
                },
                onChangeHandler: event => {
                  const userInput = event.target.value;
                  const emailIsValid = emailRegex.test(userInput);
                  setUserEmail({
                    content: userInput,
                    isValid: emailIsValid,
                    borderStyle: emailIsValid ? 'none' : invalidBorderStyle
                  });
                },
                value: userEmail.content
              }}
            />
            <LabeledInputField
              label="Password"
              inputField={{
                id: 'LoginModal-password-input',
                name: 'LoginModal-password-input',
                type: 'password',
                required: true,
                onChangeHandler: event => {
                  const userInput = event.target.value;
                  setUserPassword(userInput);
                },
                value: userPassword
              }}
            />
          </div>
          <Button handleOnClick={handleOnClick} disabled={!formIsValid}>
            Login
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default LoginModal;
