import React from 'react';
import { InputGroupContextType } from './InputGroupContext.types';

export const defaultValues: InputGroupContextType = {
  disabled: false,
  layout: 'vertical',
  size: 'medium',
};

export const InputGroupContext = React.createContext<InputGroupContextType>(defaultValues);
