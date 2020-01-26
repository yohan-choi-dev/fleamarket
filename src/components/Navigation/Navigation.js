import React from 'react';
import { Link } from 'react-router-dom';
import '../../vars/style.css';
import './Navigation.css';

import Logo from '../../components/Logo/Logo';

function Navigation(props) {
  return (
    <div className="Navigation container">
      <Link to="/">
        <Logo />
      </Link>
      <nav className="Navigation-links">
        <ul>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
