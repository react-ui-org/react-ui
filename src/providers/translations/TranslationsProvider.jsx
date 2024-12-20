import PropTypes from 'prop-types';
import React, {
  useContext,
} from 'react';
import defaultTranslations from '../../translations/en';
import { mergeDeep } from '../../utils/mergeDeep';
import TranslationsContext from './TranslationsContext';

const TranslationsProvider = ({
  children,
  translations,
}) => {
  const contextTranslations = useContext(TranslationsContext);

  return (
    <TranslationsContext.Provider
      value={mergeDeep(contextTranslations, translations)}
    >
      {children}
    </TranslationsContext.Provider>
  );
};

TranslationsProvider.defaultProps = {
  children: null,
  translations: defaultTranslations,
};

TranslationsProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.shape({}),
};

export default TranslationsProvider;
