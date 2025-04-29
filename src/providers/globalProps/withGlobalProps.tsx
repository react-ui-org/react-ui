import type {
  ForwardRefExoticComponent,
  FunctionComponent,
  RefAttributes,
} from 'react';
import React, {
  useContext,
} from 'react';
import GlobalPropsContext from './GlobalPropsContext';

const withGlobalProps = <
 P extends object,
 T extends HTMLElement,
>(
    Component: ForwardRefExoticComponent<P & RefAttributes<T>> | FunctionComponent<P>,
    componentName: string,
  ) => {
  const WithGlobalPropsComponent = React.forwardRef<T, P>((
    props,
    ref,
  ) => {
    const contextGlobalProps = useContext(GlobalPropsContext);

    const combinedProps = {
      ...(contextGlobalProps[componentName] || {}),
      ...props,
    };

    return (
      <Component
        {...(combinedProps as P)}
        ref={ref}
      />
    );
  });

  return WithGlobalPropsComponent;
};

export default withGlobalProps;

