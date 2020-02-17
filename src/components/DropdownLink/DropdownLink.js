import React from 'react';
import { Link } from 'react-router-dom';
import './DropdownLink.css';
import { ReactComponent as TriangleIcon } from '@fortawesome/fontawesome-free/svgs/solid/caret-down.svg';

function DropdownLink(props) {
  return (
    <div className="DropdownLink">
      <button className="DropdownLink-button">
        {props.children}
        <TriangleIcon className="DropdownLink-chevron" />
      </button>
      <div className="DropdownLink-content">
        <Link to="/">Profile</Link>
        <Link to="/">Account Settings</Link>
        <Link to="/">Log Out</Link>
      </div>
    </div>
  );
}

export default DropdownLink;
