import React from 'react';

export default (WrappedComponent) => {
  const withForwardedRef = (props, ref) => (
    <WrappedComponent {...props} forwardedRef={ref} />
  );

  withForwardedRef.displayName = `withForwardedRef(${WrappedComponent.name || WrappedComponent.name})`;

  return React.forwardRef(withForwardedRef);
};
