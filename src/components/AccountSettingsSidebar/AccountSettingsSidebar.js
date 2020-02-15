import React, { useState } from 'react';
import '../../vars/style.css';
import './AccountSettingsSidebar.css';

function AccountSettingsSidebar(props) {
  const { onSelectionHandler } = props;

  const [currentSelection, setCurrentSelection] = useState(0);

  const menuItems = [
    'Overview',
    'Change Email',
    'Change Password',
    'Update Contact Information',
    'Update Payment Information',
    'Delete Account'
  ];

  const menuItemComponents = menuItems.map((item, index) => {
    const menuActiveClassName =
      index == currentSelection ? 'AccountSettingsSidebar-list-item--active' : '';
    return (
      <li
        className={`AccountSettingsSidebar-list-item ${menuActiveClassName}`}
        key={`AccountSettingsSidebar-list-item-${index}`}
        onClick={() => {
          setCurrentSelection(index);
          onSelectionHandler(index);
        }}
      >
        {item}
      </li>
    );
  });

  return (
    <div className="AccountSettingsSidebar">
      <ul className="AccountSettingsSidebar-list">{menuItemComponents}</ul>
    </div>
  );
}

export default AccountSettingsSidebar;
