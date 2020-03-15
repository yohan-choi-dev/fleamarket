import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './LoginModal.css';

// Context
import AppContext from '../../contexts/AppContext';

// Components
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import LabeledInputField from '../LabeledInputField/LabeledInputField';

import APIRoute from '../../vars/api-routes';

function LoginModal(props) {
  // Constants
  //eslint-disable-next-line
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
  let location = useLocation();

  // Effects
  useEffect(() => {
    setFormIsValid(userEmail.isValid && userPassword !== '');
  }, [userEmail, userPassword]);

  // Event handlers
  const handleOnClick = async event => {
    event.preventDefault();
    const response = await fetch(`${APIRoute}/api/auth/login`, {
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

    if (response.status !== 200) {
      history.push('/login-error');
    } else {
      const body = await response.json();
      history.push('/');

      setAppState({
        ...appState,
        user: {
          ...appState.user,
          id: body.id,
          name: body.name,
          token: body.token,
          isLoggedIn: true,
          description: body.description,
          image: body.image,
          liked: body.liked,
          disliked: body.disliked,
          email: body.email
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
          <div className="LoginModal-actions">
            <Button handleOnClick={handleOnClick} disabled={!formIsValid}>
              Login
            </Button>
            <Link to="/recover-account">
              I forgot my password
            </Link>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default LoginModal;
