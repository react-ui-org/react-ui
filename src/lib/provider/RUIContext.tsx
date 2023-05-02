import React from 'react';
import defaultTranslations from '../translations/en';
import RUIContextProps from './provider.types';

const RUIContext = React.createContext<RUIContextProps>({
  globalProps: {},
  translations: defaultTranslations,
});

export default RUIContext;
