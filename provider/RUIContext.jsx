import React from 'react';
import defaultTranslations from '../translations/en';

const RUIContext = React.createContext({
  globalProps: {},
  translations: defaultTranslations,
});

export default RUIContext;
