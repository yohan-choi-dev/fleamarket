import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AccountSettingsSection from '../../components/AccountSettingsSection/AccountSettingsSection';

export default {
  title: 'AccountSettingsSection',
  component: AccountSettingsSection
};

export const Normal = () => (
  <MemoryRouter initialEntries={['/']}>
    <AccountSettingsSection />
  </MemoryRouter>
);
