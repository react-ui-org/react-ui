import PropTypes from 'prop-types';
import React from 'react';
import TranslationContext from './TranslationContext';

export default (Component, translationContext) => {
  const WithTranslationContextComponent = props => (
    <TranslationContext.Consumer>
      {context => (
        <Component
          {...props}
          translations={props.translations || context.translations[translationContext]}
        />
      )}
    </TranslationContext.Consumer>
  );

  WithTranslationContextComponent.defaultProps = {
    translations: null,
  };

  WithTranslationContextComponent.propTypes = {
    translations: PropTypes.shape({}),
  };

  return WithTranslationContextComponent;
};
