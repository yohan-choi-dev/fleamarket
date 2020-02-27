import React from 'react';
import { Link } from 'react-router-dom';
import '../../vars/style.css';
import './VerifyYourEmailPage.css';

function VerifyYourEmailPage(props) {
  return (
    <div className="VerifyYourEmailPage">
      <h1 className="VerifyYourEmailPage-main-section-heading">
        <span role="img" aria-label="emoji">💌</span><br />
        Thank you for signing up!<br />
        Please check your email for a verification link!<br />
        <Link className="VerifyYourEmailPage-back-to-home" to="/">Back to home page</Link>
      </h1>
    </div>
  );
}

export default VerifyYourEmailPage;
