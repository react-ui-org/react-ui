import type { AnchorHTMLAttributes } from 'react';

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /**
   * Link's `href` attribute.
   */
  href: string;
  /**
   * Link label.
   */
  label: string;
};
