import PropTypes from 'prop-types';
import React, {
  useMemo,
} from 'react';
import defaultTranslations from '../translations/en';
import RUIContext from './RUIContext';

const RUIProvider = ({
  children,
  globalProps,
  translations,
}) => {
  const childProps = useMemo(() => ({
    globalProps,
    translations,
  }), [globalProps, translations]);

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
