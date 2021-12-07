import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './Link.scss';

export const Link = ({
  children,
  href,
  id,
  ...restProps
}) => (
  <a
    {...transferProps(restProps)}
    href={href}
    className={styles.root}
    id={id}
  >
    {children}
  </a>
);

Link.defaultProps = {
  children: null,
  id: undefined,
};

Link.propTypes = {
  /**
   * Content of the link.
   */
  children: PropTypes.node,
  /**
   * Link's `href` attribute.
   */
  href: PropTypes.string.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const LinkWithContext = withProviderContext(Link, 'Link');

export default LinkWithContext;
