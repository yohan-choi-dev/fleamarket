import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginModal.css';

// Context
import AppContext from '../../contexts/AppContext';

// Components
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import LabeledInputField from '../LabeledInputField/LabeledInputField';

// Utilities
import APIRoute from '../../vars/api-routes';
import { postData } from '../../utils/fetch-data';

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

  // Effects
  useEffect(() => {
    setFormIsValid(userEmail.isValid && userPassword !== '');
  }, [userEmail, userPassword]);

  // Event handlers
  const handleOnClick = async event => {
    event.preventDefault();

    const response = await postData(
      `${APIRoute}/api/auth/login`,
      JSON.stringify({
        email: userEmail.content,
        password: userPassword
      }),
      'application/json'
    );

    if (response.status !== 200) {
      history.push('/login-error');
    } else {
      setAppState({
        ...appState,
        user: {
          ...appState.user,
          id: response.id,
          name: response.name,
          token: response.token,
          isLoggedIn: true,
          description: response.description,
          image: response.image,
          liked: response.liked,
          disliked: response.disliked,
          email: response.email
        }
      });

      history.push('/');
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
