import React from 'react';
import type { FormLayoutContextValue } from './FormLayout.types';

export const FormLayoutContext = React.createContext<FormLayoutContextValue | null>(null);
