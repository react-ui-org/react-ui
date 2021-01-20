import PropTypes from 'prop-types';
import React from 'react';
import RUIContext from './RUIContext';

export default (Component, translationContext) => {
  const WithTranslationContextComponent = (props) => (
    <RUIContext.Consumer>
      {(context) => (
        <Component
          {...props}
          translations={props.translations || context.translations[translationContext]}
        />
      )}
    </RUIContext.Consumer>
  );

  WithTranslationContextComponent.defaultProps = {
    translations: null,
  };

  WithTranslationContextComponent.propTypes = {
    translations: PropTypes.shape({}),
  };

  return WithTranslationContextComponent;
};
