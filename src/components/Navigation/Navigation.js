import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../vars/style.css';
import './Navigation.css';

import Logo from '../../components/Logo/Logo';

function Navigation(props) {
  let location = useLocation();

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
            <Link
              to={{
                pathname: `/signup`,
                // This is the trick! This link sets
                // the `background` in location state.
                state: { background: location }
              }}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
