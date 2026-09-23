import PropTypes from 'prop-types';
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

  WithGlobalPropsComponent.propTypes = {
    forwardedRef: PropTypes.oneOfType([
      PropTypes.func,

      // The props can be of any type and here we need to support them all
      // eslint-disable-next-line react/forbid-prop-types
      PropTypes.shape({ current: PropTypes.any }),
    ]),
  };

  return React.forwardRef<Element, Props>((props, ref) => (
    <WithGlobalPropsComponent
      {...props as Props}
      forwardedRef={ref}
    />
  ));
};
