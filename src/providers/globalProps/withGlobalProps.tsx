import PropTypes from 'prop-types';
import React, {
  useContext,
} from 'react';
import GlobalPropsContext from './GlobalPropsContext';

export default (Component, componentName) => {
  const WithGlobalPropsComponent = ({
    forwardedRef,
    ...rest
  }) => {
    const contextGlobalProps = useContext(GlobalPropsContext);

    return (
      <Component
        {...contextGlobalProps[componentName] || {}}
        {...rest}
        ref={forwardedRef}
      />
    );
  };

  WithGlobalPropsComponent.defaultProps = {
    forwardedRef: undefined,
  };

  WithGlobalPropsComponent.propTypes = {
    forwardedRef: PropTypes.oneOfType([
      PropTypes.func,

      // The props can be of any type and here we need to support them all
      // eslint-disable-next-line react/forbid-prop-types
      PropTypes.shape({ current: PropTypes.any }),
    ]),
  };

  return React.forwardRef((props, ref) => (<WithGlobalPropsComponent {...props} forwardedRef={ref} />));
};
