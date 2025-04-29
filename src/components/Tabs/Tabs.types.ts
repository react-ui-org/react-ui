import type { ReactNode } from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';

export type TabsProps = CleanedComponentPropsWithChildren<'nav'> & {
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
