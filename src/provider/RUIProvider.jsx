import PropTypes from 'prop-types';
import React, {
  useContext,
  useMemo,
} from 'react';
import defaultTranslations from '../translations/en';
import { mergeDeep } from '../utils/mergeDeep';
import RUIContext from './RUIContext';

const RUIProvider = ({
  children,
  globalProps,
  translations,
}) => {
  const context = useContext(RUIContext);
  const childProps = useMemo(() => ({
    globalProps: mergeDeep(context?.globalProps || {}, globalProps),
    translations: mergeDeep(context?.translations || {}, translations),
  }), [context, globalProps, translations]);

  return (
    <RUIContext.Provider
      value={childProps}
    >
      {children}
    </RUIContext.Provider>
  );
};

RUIProvider.defaultProps = {
  children: null,
  globalProps: null,
  translations: defaultTranslations,
};

RUIProvider.propTypes = {
  children: PropTypes.node,
  globalProps: PropTypes.shape({}),
  translations: PropTypes.shape({}),
};

export default RUIProvider;
