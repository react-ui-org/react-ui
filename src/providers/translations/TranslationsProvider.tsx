import React, {
  useContext,
} from 'react';
import { mergeDeep } from '../../utils/mergeDeep';
import TranslationsContext from './TranslationsContext';
import type { TranslationsProviderProps } from './TranslationProvider.types';

const TranslationsProvider: React.FunctionComponent<TranslationsProviderProps> = ({
  children,
  translations = {},
}) => {
  const contextTranslations = useContext(TranslationsContext);

  return (
    <TranslationsContext.Provider
      value={mergeDeep(contextTranslations, translations) as typeof contextTranslations}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export default TranslationsProvider;
