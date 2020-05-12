import PropTypes from 'prop-types';
import React from 'react';
import TranslationContext from './TranslationContext';

const TranslationProvider = ({
  children,
  translations,
}) => (
  <TranslationContext.Provider value={{ translations }}>
    {children}
  </TranslationContext.Provider>
);

TranslationProvider.defaultProps = {
  children: null,
};

TranslationProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.shape({}).isRequired,
};

export default TranslationProvider;
