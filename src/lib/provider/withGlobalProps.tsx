import React from 'react';
import { WithGlobalPropsComponentProps } from './provider.types';
import RUIContext from './RUIContext';

export default function withGlobalProps<P>(
  Component: React.FC<P>,
  componentName: string,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<unknown>> {
  const WithGlobalPropsComponent: React.FC<WithGlobalPropsComponentProps> = ({
    forwardedRef,
    ...rest
  }) => (
    <RUIContext.Consumer>
      {({ globalProps }) => {
        const contextGlobalProps = globalProps ? globalProps[componentName] : {};

        return (
          <Component {...(contextGlobalProps as object)} {...(rest as P)} ref={forwardedRef} />
        );
      }}
    </RUIContext.Consumer>
  );

  return React.forwardRef<unknown, P>((props, ref) => (
    <WithGlobalPropsComponent {...props} forwardedRef={ref} />
  ));
}
