import React from 'react';
import Link from 'react-router-dom';
import './DropdownLink.css';
import { ReactComponent as TrangleIcon } from '@fortawesome/fontawesome-free/svgs/solid/caret-down.svg';

//did not do Link because it is hard to test in storybook will be add when we use the compenent
class DropdownLink extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <div class="dropdown">
        <button class="dropbtn">{username}<TrangleIcon className='Icon'/></button>
        <div class="dropdown-content">
          <a href="#">Profile</a>  
          <a href="#">Account Settings</a>
          <a href="#">Log Out</a>
        </div>
      </div>
    );
  }
}

export default DropdownLink;
