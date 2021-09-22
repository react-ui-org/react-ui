import PropTypes from 'prop-types';
import React from 'react';
import FormLayoutContext from './FormLayoutContext';

const FormLayoutProvider = ({
  children,
  layout,
}) => (
  <FormLayoutContext.Provider
    value={{ layout }}
  >
    {children}
  </FormLayoutContext.Provider>
);

FormLayoutProvider.defaultProps = {
  children: null,
  layout: 'vertical',
};

FormLayoutProvider.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default FormLayoutProvider;
