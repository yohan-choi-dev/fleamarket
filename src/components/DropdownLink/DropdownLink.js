import React, { useContext } from 'react';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import './DropdownLink.css';

// Contexts
import AppContext from '../../contexts/AppContext';

// Components
import { ReactComponent as TriangleIcon } from '@fortawesome/fontawesome-free/svgs/solid/caret-down.svg';

function DropdownLink(props) {
  const { appState, setAppState } = useContext(AppContext);
  const cookies = new Cookies();

  return (
    <div className="DropdownLink">
      <button className="DropdownLink-button">
        <span className="DropdownLink-username">{props.children}</span>
        <TriangleIcon className="DropdownLink-chevron" />
      </button>
      <div className="DropdownLink-content">
        <ul>
          <li><Link to="/">Profile</Link></li>
          <li><Link to="/">Account Settings</Link></li>
          <li><Link to="/" onClick={() => {
            // Remove authentication cookie
            cookies.remove('fleamarket-authentication');

            // Set app state 
            setAppState({
              ...appState,
              user: {
                ...appState.user,
                isLoggedIn: false,
                token: '',
                name: ''
              }
            });
          }}>Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default DropdownLink;
