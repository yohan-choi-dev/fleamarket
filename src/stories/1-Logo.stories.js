import React from 'react';
import Logo from '../components/Logo/Logo';

export default {
  title: 'Logo',
  component: Logo,
};

export const Normal = () => (<Logo />);

export const WithBackground = () => (
  <Logo withBackground={true} />
);
