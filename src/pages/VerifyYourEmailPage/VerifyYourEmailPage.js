import React from 'react';
import { Link } from 'react-router-dom';
import '../../vars/style.css';
import './VerifyYourEmailPage.css';

import Footer from '../../components/Footer/Footer';

function VerifyYourEmailPage(props) {
  return (
    <div className="VerifyYourEmailPage">
      <h1 className="VerifyYourEmailPage-main-section-heading">
        <span>💌</span><br />
        Thank you for signing up!<br />
        Please check your email for a verification link!<br />
        <Link className="VerifyYourEmailPage-back-to-home" to="/">Back to home page</Link>
      </h1>
    </div>
  );
}

export default VerifyYourEmailPage;
