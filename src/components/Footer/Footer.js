import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="Footer container">
      <div className="Footer-content">
        <div className="Footer-content-column-left">
          <h4 className="Footer-content-heading">About</h4>
          <ul>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
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
            +1 (647) 332-0960
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
