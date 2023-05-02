import React, { useMemo } from 'react';
import defaultTranslations from '../translations/en';
import RUIContext from './RUIContext';
import RUIProviderProps from './provider.types';

const RUIProvider = ({
  children = null,
  globalProps = {},
  translations = defaultTranslations,
}: RUIProviderProps) => {
  const providerValue = useMemo(() => ({
    globalProps,
    translations,
  }), [globalProps, translations]);

  return (
    <RUIContext.Provider value={providerValue}>
      {children}
    </RUIContext.Provider>
  );
};

export default RUIProvider;
