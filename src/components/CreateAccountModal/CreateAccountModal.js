import React from 'react';
import './CreateAccountModal.css';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';

function CreateAccountModal(props) {
  const handleOnClick = event => {
    // 1. Validation
    // 2.
  };

  return (
    <div className="CreateAccountModal">
      <Modal className="CreateAccountModal-modal" title="Create an account">
        <form className="CreateAccountModal-modal-form">
          <div className="CreateAccountModal-modal-form-group CreateAccountModal-modal-form-email">
            <label className="CreateAccountModal-form-label" htmlFor="create-account-email">
              Email
            </label>
            <input
              className="CreateAccountModal-form-input"
              type="email"
              name="email"
              id="create-account-email"
              placeholder="funnyguy@email.com"
              required
              autoFocus
            />
          </div>
          <div className="CreateAccountModal-modal-form-group CreateAccountModal-modal-form-password">
            <label className="CreateAccountModal-form-label" htmlFor="create-account-password">
              Password
            </label>
            <input
              className="CreateAccountModal-form-input"
              type="password"
              name="password"
              id="create-account-password"
              placeholder="••••••••••"
              required
            />
          </div>
          <div className="CreateAccountModal-modal-form-group CreateAccountModal-modal-form-confirm-password">
            <label
              className="CreateAccountModal-form-label"
              htmlFor="create-account-confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="CreateAccountModal-form-input"
              type="password"
              name="confirm-password"
              id="create-account-confirm-password"
              placeholder="••••••••••"
              required
            />
          </div>
          {/* TODO: Change the below to "input" instead of button */}
          <Button handleOnClick={handleOnClick}>Sign Up</Button>
        </form>
      </Modal>
    </div>
  );
}

export default CreateAccountModal;
