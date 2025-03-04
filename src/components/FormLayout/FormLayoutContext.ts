import React from 'react';
import { FormLayoutContextType } from './FormLayoutContext.types';

export const defaultValues: FormLayoutContextType = {
  layout: 'vertical',
};

export const FormLayoutContext = React.createContext<FormLayoutContextType>(defaultValues);
