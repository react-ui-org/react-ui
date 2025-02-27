import { ReactNode } from 'react';

export type TabsProps = React.ComponentProps<'nav'> & {
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
