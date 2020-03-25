import React from 'react';
import './PrivacyPolicyPage.css';

// Components
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

const PrivacyPolicyPage = (props) => {
  return (
    <div className="PrivacyPolicyPage">
      <Navigation />
      <div className="PrivacyPolicyPage-content container">
        <h2>Privacy Policy</h2>
        <p>Thank you for trusting Fleamarket. We’ll never share your personal information to anyone or third parties except described below. This page explains how we collect, use, disclose and safeguard your information when you visit our website.</p>
        <p><strong>The information we collect:</strong></p>
        <ul>
          <li>Registration, user profile, payment methods and transaction.</li>
          <li>The user(s) is under no obligation to provide his/her personal information of any kind. Downside to this is the user(s) will not be able to use some of the website features.</li>
        </ul>
        <p><strong>How we use your information:</strong></p>
        <ul>
          <li>
            We use your information to test and improve our security and services.
            <ul>
              <li>User-to-user communications</li>
              <li>Notify the user about updates of the site</li>
              <li>Prevent fraudulent transaction, monitor against theft, and protect from criminal activity</li>
              <li>Respond to user request</li>
            </ul>
          </li>
        </ul>
        <p><strong>How we share information we collect:</strong></p>
        <ul>
          <li>
            With the user consent:
            <ul>
              <li>With your consent, we may share your information with third parties for marketing purposes.</li>
              <li>Security purposes, or when there is change of control.</li>
            </ul>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage;