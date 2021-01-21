import PropTypes from 'prop-types';
import React from 'react';
import RUIContext from './RUIContext';

export default (Component, componentName) => {
  const WithProviderContextComponent = (props) => (
    <RUIContext.Consumer>
      {(context) => {
        const contextGlobalProps = context?.globalProps ? context.globalProps[componentName] : null;
        const contextTranslations = context?.translations ? context.translations[componentName] : null;

        return (
          <Component
            {...contextGlobalProps}
            {...props}
            translations={props.translations || contextTranslations}
          />
        );
      }}
    </RUIContext.Consumer>
  );

  WithProviderContextComponent.defaultProps = {
    translations: undefined,
  };

  WithProviderContextComponent.propTypes = {
    translations: PropTypes.shape({}),
  };

  return WithProviderContextComponent;
};
