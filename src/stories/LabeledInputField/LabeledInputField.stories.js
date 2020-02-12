import React from 'react';
import LabeledInputField from '../../components/LabeledInputField/LabeledInputField';

export default {
  title: 'LabeledInputField',
  component: LabeledInputField,
};

export const Normal = () => (
  <LabeledInputField
    label="Email"
    inputField={{
      id: "storybook-input-field",
      name: "storybook-input-field",
      type: "text",
      placeholder: "example@email.com",
      required: true,
      autoFocus: true,
      onChangeHandler: (event) => {
        console.log(event.target.value);
      }
    }}
  />
);