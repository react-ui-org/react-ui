import PropTypes from 'prop-types';
import React, {
  useContext,
} from 'react';
import { mergeDeep } from '../../utils/mergeDeep';
import GlobalPropsContext from './GlobalPropsContext';
import type {
  GlobalProps,
  GlobalPropsProviderProps,
} from './GlobalProps.types';

const GlobalPropsProvider: React.FunctionComponent<GlobalPropsProviderProps> = ({
  children,
  globalProps = {},
}: GlobalPropsProviderProps) => {
  const contextGlobalProps = useContext(GlobalPropsContext);

  return (
    <GlobalPropsContext.Provider
      value={mergeDeep(contextGlobalProps, globalProps) as GlobalProps}
    >
      {children}
    </GlobalPropsContext.Provider>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
GlobalPropsProvider.propTypes = {
  children: PropTypes.node,
  globalProps: PropTypes.shape({}),
};

export default GlobalPropsProvider;
