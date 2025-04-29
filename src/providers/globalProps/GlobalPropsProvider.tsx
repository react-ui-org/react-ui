import React, {
  useContext,
} from 'react';
import { mergeDeep } from '../../utils/mergeDeep';
import GlobalPropsContext from './GlobalPropsContext';
import type { GlobalPropsProviderProps } from './GlobalPropsProvider.types';

const GlobalPropsProvider: React.FunctionComponent<GlobalPropsProviderProps> = ({
  children,
  globalProps = {},
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

export default GlobalPropsProvider;
