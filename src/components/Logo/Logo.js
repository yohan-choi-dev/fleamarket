import React from 'react';
import '../../vars/style.css';
import './Logo.css';

function Logo(props) {
  const { withBackground } = props;
  return (
    <div className={`Logo ${withBackground ? 'Logo-with-background' : ''}`}>
      flea<span>market.</span>
    </div>
  );
}

export default Logo;