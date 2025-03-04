export type TextLinkProps = React.ComponentProps<'a'> & {
  /**
   * Link's `href` attribute.
   */
  href: string;
  /**
   * Link label.
   */
  label: string;
};
