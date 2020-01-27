import React from 'react';
import { Link } from 'react-router-dom';
import '../../vars/style.css';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer container">
      <div className="Footer-content">
        <div className="Footer-content-column-left">
          <h4 className="Footer-content-heading">About</h4>
          <ul>
            <li>
              <Link to="/about/company">Company</Link>
            </li>
            <li>
              <Link to="/about/policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/about/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="Footer-content-column-right">
          <h4 className="Footer-content-heading">Contact Us</h4>
          <p>
            1750 Finch Ave E,
            <br />
            Toronto, ON
            <br />
            Canada 🇨🇦
            <br />
            +1 (416) 111-1111
          </p>
        </div>
      </div>
      <div className="Footer-copyright">
        <p>Copyright © 2020 FleaMarket Inc. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
