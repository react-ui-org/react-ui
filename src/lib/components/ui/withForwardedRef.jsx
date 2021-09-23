import React from 'react';

export default (WrappedComponent, componentName) => {
  const withForwardedRef = React.forwardRef((props, ref) => (
    <WrappedComponent {...props} forwardedRef={ref} />
  ));

  // Preserve component name while wrapping former component with higher-order component
  withForwardedRef.displayName = componentName;

  return withForwardedRef;
};
