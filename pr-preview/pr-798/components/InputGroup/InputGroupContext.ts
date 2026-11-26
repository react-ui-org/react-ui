import React from 'react';
import type { InputGroupContextValue } from './InputGroup.types';

export const InputGroupContext = React.createContext<InputGroupContextValue | null>(null);
