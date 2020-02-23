import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DOMPurify from 'dompurify';

import './CreateAccountModal.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import LabeledInputField from '../LabeledInputField/LabeledInputField';

import APIRoute from '../../vars/api-routes';

function CreateAccountModal(props) {
  const [userName, setUserName] = useState({
    first: '',
    last: ''
  });
  const [userEmail, setUserEmail] = useState({
    content: '',
    isValid: false,
    borderStyle: 'none'
  });
  const [userPassword, setUserPassword] = useState({
    content: '',
    isValid: false,
    borderStyle: 'none'
  });
  const [userPasswordConfirm, setUserPasswordConfirm] = useState({
    content: ''
  });
  const [passwordIsSame, setPasswordIsSame] = useState(false);
  const [valid, setValid] = useState(false);

  const history = useHistory();

  var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const invalidBorderStyle = '2px solid #ff7e7e';

  // Effects
  useEffect(() => {
    setValid(userEmail.isValid && userPassword.isValid && passwordIsSame);
  }, [userEmail.content, passwordIsSame]);

  useEffect(() => {
    const isSame = userPassword.content === userPasswordConfirm.content;
    setUserPassword({
      ...userPassword,
      borderStyle: isSame ? 'none' : invalidBorderStyle
    });
    setPasswordIsSame(isSame);
  }, [userPassword.content, userPasswordConfirm.content]);

  const handleOnClick = async event => {
    event.preventDefault();
    const response = await fetch(`${APIRoute}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
      },
      body: JSON.stringify({
        email: userEmail.content,
        name: `${userName.first} ${userName.last}`,
        password: userPassword.content
      })
    });

    if (response.status != 201) {
      const body = await response.json();

      window.alert(`Failed to sign up. ${body.data[0].msg}`);
    } else {
      history.push('/verify-your-email');
    }
  };

  return (
    <div className="CreateAccountModal">
      <Modal className="CreateAccountModal-modal" title="Create an account">
        <form className="CreateAccountModal-form">
          <div className="CreateAccount-name-input">
            <LabeledInputField
              label="First Name"
              inputField={{
                id: 'CreateAccount-fn-input',
                name: 'CreateAccount-fn-input',
                type: 'text',
                required: true,
                autoFocus: true,
                onChangeHandler: event => {
                  const userInput = DOMPurify.sanitize(event.target.value.trim());
                  setUserName({
                    ...userName,
                    first: userInput
                  });
                }
              }}
            />
            <LabeledInputField
              label="Last Name"
              inputField={{
                id: 'CreateAccount-ln-input',
                name: 'CreateAccount-ln-input',
                type: 'text',
                required: true,
                onChangeHandler: event => {
                  const userInput = DOMPurify.sanitize(event.target.value.trim());
                  setUserName({
                    ...userName,
                    last: userInput
                  });
                }
              }}
            />
          </div>
          <LabeledInputField
            label="Email"
            inputField={{
              id: 'CreateAccount-email-input',
              name: 'CreateAccount-email-input',
              type: 'email',
              placeholder: 'example@email.com',
              required: true,
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
              id: 'CreateAccount-password-input',
              name: 'CreateAccount-password-input',
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
              id: 'CreateAccount-password-confirm-input',
              name: 'CreateAccount-password-confirm-input',
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
                  content: userInput
                });
              },
              value: userPasswordConfirm.content
            }}
          />
          <Button handleOnClick={handleOnClick} disabled={!valid}>
            Sign Up
          </Button>
        </form>
      </Modal>
    </div>
  );
}

export default CreateAccountModal;
