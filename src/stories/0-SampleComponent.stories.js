import React from 'react';
import SampleComponent from '../components/SampleComponent/SampleComponent';

export default {
  title: 'SampleComponent',
  component: SampleComponent,
};

export const Normal = () => (<SampleComponent />);

export const CustomText = () => (
  <SampleComponent customText="Thanks!" />
);
