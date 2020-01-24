import React from 'react';
import '../../vars/style.css';
import './ClickableLink.css';

function ClickableLink(props) {
  const { path } = props;
  return (
    <a className="ClickableLink" href={path ? path : '#'}>{props.children}</a>
  )
}

export default ClickableLink;