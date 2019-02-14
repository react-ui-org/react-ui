import PropTypes from 'prop-types';
import React from 'react';
import TranslationContext from './TranslationContext';

export default (Component) => {
  const WithTranslationContextComponent = props => (
    <TranslationContext.Consumer>
      {context => (
        <Component
          {...props}
          translations={props.translations || context.translations[Component.name]}
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
