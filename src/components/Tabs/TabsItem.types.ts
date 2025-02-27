import { ReactNode } from 'react';

export type TabsItemProps = React.ComponentProps<'a'> & {
  /**
   * Optional element shown after item's label, e.g. an icon.
   */
  afterLabel?: ReactNode;
  /**
   * Optional element shown before item's label, e.g. an icon.
   */
  beforeLabel?: ReactNode;
  /**
   * Item's link URL. Optionally add custom routing function to the `onClick` option to bypass
   * browser's default navigation.
   */
  href: string;
  /**
   * ID of the root HTML element. It also serves as base for nested elements:
   * * `<ID>__link`
   * * `<ID>__label`
   */
  id?: string;
  /**
   * If `true`, item is marked as active.
   */
  isActive?: boolean;
  /**
   * Item's label.
   */
  label: string;
  /**
   * Function to call on item click, e.g. custom routing function.
   */
  onClick?: () => void;
};
