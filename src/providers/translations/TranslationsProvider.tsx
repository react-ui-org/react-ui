import React, {
  useContext,
} from 'react';
import { mergeDeep } from '../../utils/mergeDeep';
import TranslationsContext from './TranslationsContext';
import type {
  Translations,
  TranslationsProviderProps,
} from './Translations.types';

const TranslationsProvider: React.FunctionComponent<TranslationsProviderProps> = ({
  children,
  translations = {},
}: TranslationsProviderProps) => {
  const contextTranslations = useContext(TranslationsContext);

  return (
    <TranslationsContext.Provider
      value={mergeDeep<Translations>(contextTranslations, translations)}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

export default TranslationsProvider;
