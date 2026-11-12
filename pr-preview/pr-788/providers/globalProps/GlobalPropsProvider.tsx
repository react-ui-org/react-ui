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
      value={mergeDeep<GlobalProps>(contextGlobalProps, globalProps)}
    >
      {children}
    </GlobalPropsContext.Provider>
  );
};

export default GlobalPropsProvider;
