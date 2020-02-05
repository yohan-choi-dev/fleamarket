import React, { useState, useEffect } from 'react';
import './CreateAccountModal.css';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import LabeledInputField from '../LabeledInputField/LabeledInputField';

function CreateAccountModal(props) {
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
    setPasswordIsSame(isSame)
  }, [userPassword.content, userPasswordConfirm.content]);

  const handleOnClick = event => {
    // 1. Validation

    // setValid(emailRegex.test(email));

    // 2. Send POST request
    // fetch({
    //   url: 'http://myvmlab.senecacollege.ca:6761/auth/signup',
    //   body: JSON.stringify({
    //     email: email,
    //     name: 'Test',
    //     password: password
    //   })
    // });
  };

  return (
    <div className="CreateAccountModal">
      <Modal className="CreateAccountModal-modal" title="Create an account">
        <form className="CreateAccountModal-form">
          <LabeledInputField
            label="Email"
            inputField={{
              id: "CreateAccount-email-input",
              name: "CreateAccount-email-input",
              type: "email",
              placeholder: "example@email.com",
              required: true,
              autoFocus: true,
              style: {
                border: userEmail.borderStyle
              },
              onChangeHandler: (event) => {
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
              id: "CreateAccount-password-input",
              name: "CreateAccount-password-input",
              type: "password",
              placeholder: "••••••••••",
              required: true,
              autoFocus: false,
              style: {
                border: userPassword.borderStyle
              },
              onChangeHandler: (event) => {
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
              id: "CreateAccount-password-confirm-input",
              name: "CreateAccount-password-confirm-input",
              type: "password",
              placeholder: "••••••••••",
              required: true,
              autoFocus: false,
              style: {
                border: userPassword.borderStyle
              },
              onChangeHandler: (event) => {
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
