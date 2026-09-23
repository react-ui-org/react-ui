import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './TextLink.module.scss';
import type { TextLinkProps } from './TextLink.types';

export const TextLink: React.FunctionComponent<TextLinkProps> = ({
  href,
  label,
  ...restProps
}: TextLinkProps) => (
  <a
    {...transferProps(restProps)}
    className={styles.root}
    href={href}
  >
    {label}
  </a>
);

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
TextLink.propTypes = {
  /**
   * Link's `href` attribute.
   */
  href: PropTypes.string.isRequired,
  /**
   * Link label.
   */
  label: PropTypes.string.isRequired,
};

export const LinkWithGlobalProps = withGlobalProps<TextLinkProps, never>(TextLink, 'TextLink');

export default LinkWithGlobalProps;
