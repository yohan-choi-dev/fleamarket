import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import Logo from '../../components/Logo/Logo';
import DropdownLink from '../../components/DropdownLink/DropdownLink';

function Navigation(props) {
  let location = useLocation();
  const { appState } = useContext(AppContext);

  const rightNavigations = appState.user.isLoggedIn ? (
    <li>
      <DropdownLink>{appState.user.name}</DropdownLink>
    </li>
  ) : (
    <React.Fragment>
      <li>
        <Link
          to={{
            pathname: `/login`,
            state: { background: location }
          }}
        >
          Login
        </Link>
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
    </React.Fragment>
  );

  return (
    <div className="Navigation container">
      <Link to="/">
        <Logo />
      </Link>
      <nav className="Navigation-links">
        <ul>{rightNavigations}</ul>
      </nav>
    </div>
  );
}

export default Navigation;
