import React from 'react';
import '../../vars/style.css';
import './AccountSettings.css';
import AccountSettingsSection from '../AccountSettingsSection/AccountSettingsSection';

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: 'Overview' };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(props) {
    document.getElementById(this.state.content).style.color = '#aeaeae';
    this.setState({ content: props });
    document.getElementById(props).style.color = '#8771a5';
  }
  render() {
    return (
      <div className="AccountSettings">
        <div className="NavgationBar" id="NavgationBar">
          <ul>
            <li>
              <button id="Overview" onClick={() => this.handleClick('Overview')}>
                Overview
              </button>
            </li>
            <li>
              <button id="ChangeEmail" onClick={() => this.handleClick('ChangeEmail')}>
                ChangeEmail
              </button>
            </li>
            <li>
              <button id="ChangePassword" onClick={() => this.handleClick('ChangePassword')}>
                Change Password
              </button>
            </li>
            <li>
              <button id="UpdateContact" onClick={() => this.handleClick('UpdateContact')}>
                Update Contact Information
              </button>
            </li>
            <li>
              <button id="UpdatePayment" onClick={() => this.handleClick('UpdatePayment')}>
                Update Payment Information
              </button>
            </li>
            <li>
              <button id="DeleteAccount" onClick={() => this.handleClick('DeleteAccount')}>
                Delete Account
              </button>
            </li>
          </ul>
        </div>
        <div className="DisplaySection">
          <AccountSettingsSection content={this.state.content} />
        </div>
      </div>
    );
  }
}

export default AccountSettings;
