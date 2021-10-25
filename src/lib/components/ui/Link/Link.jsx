import PropTypes from 'prop-types';
import React from 'react';
import transferProps from '../../../utils/transferProps';
import { withProviderContext } from '../../../provider';
import styles from './Link.scss';

export const Link = ({
  children,
  clickHandler,
  href,
  id,
  ...restProps
}) => (
  <a
    {...transferProps(restProps)}
    href={href}
    className={styles.root}
    id={id}
    onClick={clickHandler}
  >
    {children}
  </a>
);

Link.defaultProps = {
  children: null,
  clickHandler: undefined,
  id: undefined,
};

Link.propTypes = {
  /**
   * Content of the link.
   */
  children: PropTypes.node,
  /**
   * Function to call when the link is clicked.
   */
  clickHandler: PropTypes.func,
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
