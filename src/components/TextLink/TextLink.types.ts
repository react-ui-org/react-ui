import type { CleanedComponentProps } from '../../types';

export type TextLinkProps = CleanedComponentProps<'a'> & {
  /**
   * Link's `href` attribute.
   */
  href: string;
  /**
   * Link label.
   */
  label: string;
};
