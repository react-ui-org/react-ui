import React from 'react';
import {
  Priority,
  Size,
} from '../../types';
import { ButtonGroupContextType } from './ButtonGroupContext.types';

export const defaultValues: ButtonGroupContextType = {
  block: false,
  disabled: false,
  priority: 'filled' as Priority,
  size: 'medium' as Size,
};

export const ButtonGroupContext = React.createContext <ButtonGroupContextType>(defaultValues);
