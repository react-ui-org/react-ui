import PropTypes from 'prop-types';
import React, {
  useContext,
} from 'react';
import { mergeDeep } from '../../utils/mergeDeep';
import GlobalPropsContext from './GlobalPropsContext';

const GlobalPropsProvider = ({
  children,
  globalProps,
}) => {
  const contextGlobalProps = useContext(GlobalPropsContext);

  return (
    <GlobalPropsContext.Provider
      value={mergeDeep(contextGlobalProps, globalProps)}
    >
      {children}
    </GlobalPropsContext.Provider>
  );
};

GlobalPropsProvider.defaultProps = {
  children: undefined,
  globalProps: {},
};

GlobalPropsProvider.propTypes = {
  children: PropTypes.node,
  globalProps: PropTypes.shape({}),
};

export default GlobalPropsProvider;
