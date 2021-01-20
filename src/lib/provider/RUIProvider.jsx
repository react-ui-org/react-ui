import PropTypes from 'prop-types';
import React from 'react';
import RUIContext from './RUIContext';

const RUIProvider = ({
  children,
  translations,
}) => (
  <RUIContext.Provider value={{ translations }}>
    {children}
  </RUIContext.Provider>
);

RUIProvider.defaultProps = {
  children: null,
};

RUIProvider.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.shape({}).isRequired,
};

export default RUIProvider;
