import React, {
  useContext,
} from 'react';
import type {
  ComponentType,
  RefAttributes,
} from 'react';
import GlobalPropsContext from './GlobalPropsContext';
import type { WithGlobalPropsComponentProps } from './GlobalProps.types';

export default <Props extends object, Element>(
  Component: ComponentType<Props & RefAttributes<Element>>,
  componentName: string,
) => {
  const WithGlobalPropsComponent = ({
    forwardedRef,
    ...rest
  }: WithGlobalPropsComponentProps<Props, Element>) => {
    const contextGlobalProps = useContext(GlobalPropsContext);

    return (
      <Component
        {...contextGlobalProps[componentName] || {}}
        {...rest as Props}
        ref={forwardedRef}
      />
    );
  };

  return React.forwardRef<Element, Props>((props, ref) => (
    <WithGlobalPropsComponent
      {...props as Props}
      forwardedRef={ref}
    />
  ));
};
