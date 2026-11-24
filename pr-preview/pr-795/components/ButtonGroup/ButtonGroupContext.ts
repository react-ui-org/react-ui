import React from 'react';
import type { ButtonGroupContextValue } from './ButtonGroup.types';

export const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(null);
