import React from 'react';
import type { GlobalProps } from './GlobalProps.types';

const GlobalPropsContext = React.createContext<GlobalProps>({});

export default GlobalPropsContext;
