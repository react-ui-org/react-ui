import PropTypes from 'prop-types';
import React from 'react';
import RUIContext from './RUIContext';

export default (Component, componentName) => {
  const WithGlobalPropsComponent = ({
    forwardedRef,
    ...rest
  }) => (
    <RUIContext.Consumer>
      {({ globalProps }) => {
        const contextGlobalProps = globalProps ? globalProps[componentName] : null;

        return (
          <Component
            {...contextGlobalProps}
            {...rest}
            ref={forwardedRef}
          />
        );
      }}
    </RUIContext.Consumer>
  );

  WithGlobalPropsComponent.defaultProps = {
    forwardedRef: undefined,
  };

  WithGlobalPropsComponent.propTypes = {
    forwardedRef: PropTypes.oneOfType([
      PropTypes.func,
      // eslint-disable-next-line react/forbid-prop-types
      PropTypes.shape({ current: PropTypes.any }),
    ]),
  };

  return React.forwardRef((props, ref) => (<WithGlobalPropsComponent {...props} forwardedRef={ref} />));
};
