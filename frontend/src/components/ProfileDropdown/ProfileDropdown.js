import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

// Contexts
import AppContext from '../../contexts/AppContext';
import { ChatContext } from '../../contexts/ChatContext/ChatContext';

// Components
import { ReactComponent as TriangleIcon } from '@fortawesome/fontawesome-free/svgs/solid/caret-down.svg';

function ProfileDropdown(props) {
  const { appState, setAppState } = useContext(AppContext);
  const { chatState } = useContext(ChatContext);

  return (
    <div className="ProfileDropdown">
      <button className="ProfileDropdown-button">
        <span className="ProfileDropdown-username">{props.children}</span>
        <TriangleIcon className="ProfileDropdown-chevron" />
      </button>
      <div className="ProfileDropdown-content">
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/chatroom">Chatroom</Link></li>
          <li><Link to="/account-settings">Account Settings</Link></li>
          <li><Link to="/" onClick={() => {
            chatState.rootIO.disconnect();
            // Set app state 
            setAppState({
              ...appState,
              user: {
                ...appState.user,
                isLoggedIn: false,
              }
            });
          }}>Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileDropdown;
