import PropTypes from 'prop-types';
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
      value={mergeDeep(contextTranslations, translations) as Translations}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
TranslationsProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.shape({}),
};

export default TranslationsProvider;
