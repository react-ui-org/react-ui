import type {
  HTMLAttributes,
  ReactNode,
} from 'react';

/**
 * Props of the `Tabs` component.
 */
export type TabsProps = HTMLAttributes<HTMLElement> & {
  /**
   * Nested `TabsItem` elements.
   */
  children: ReactNode;
  /**
   * ID of the root HTML element. It also serves as base for nested element:
   * * `<ID>__list`
   */
  id?: string;
};
