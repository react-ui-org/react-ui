import React from 'react';
import UserInputBase from '../UserInputBase';

const CheckboxField = props => (
  <input
    {...props}
    type="checkbox"
  />
);

export default UserInputBase(CheckboxField, true);
