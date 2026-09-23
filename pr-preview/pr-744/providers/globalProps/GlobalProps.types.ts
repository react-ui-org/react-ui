import type {
  ForwardedRef,
  ReactNode,
} from 'react';

/**
 * Global props keyed by component name, e.g. `{ Button: { size: 'small' } }`.
 */
export type GlobalProps = Record<string, Record<string, unknown>>;

/**
 * Props of the `GlobalPropsProvider` component.
 */
export type GlobalPropsProviderProps = {
  /**
   * Children wrapped by the provider.
   */
  children?: ReactNode;
  /**
   * Global props to be merged with the ones from the parent providers.
   */
  globalProps?: GlobalProps;
};

/**
 * Props of the component `withGlobalProps` renders; `forwardedRef` carries the ref through.
 */
export type WithGlobalPropsComponentProps<Props, Element> = Props & {
  forwardedRef?: ForwardedRef<Element>;
};
