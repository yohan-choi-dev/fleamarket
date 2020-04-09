import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

// Contexts
import AppContext from '../../contexts/AppContext';
import { ChatContext } from '../../contexts/ChatContext/ChatContext';

// Components
import Logo from '../../components/Logo/Logo';
import ProfileDropdown from '../../components/ProfileDropdown/ProfileDropdown';

function Navigation(props) {
  let location = useLocation();
  const { appState } = useContext(AppContext);
  const { chatState } = useContext(ChatContext);

  const rightNavigations = appState.user.isLoggedIn ? (
    <React.Fragment>
      <li className="Navigation-links-list-item">
        <ProfileDropdown>{appState.user.name}</ProfileDropdown>
      </li>
      <li
        className="Navigation-links-list-item Navigation-notifications"
        style={{
          backgroundColor: chatState.notifications.length > 0 ? '#ff7e7e' : '#dfdfdf'
        }}
      >
        {chatState.notifications.length}
      </li>
    </React.Fragment>
  ) : (
      <React.Fragment>
        <li className="Navigation-links-list-item">
          <Link
            to={{
              pathname: `/login`,
              state: { background: location }
            }}
          >
            Login
        </Link>
        </li>
        <li className="Navigation-links-list-item">
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
        <ul className="Navigation-links-list">{rightNavigations}</ul>
      </nav>
    </div>
  );
}

export default Navigation;
