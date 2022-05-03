import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './TextLink.scss';

export const TextLink = ({
  href,
  id,
  label,
  ...restProps
}) => (
  <a
    {...transferProps(restProps)}
    href={href}
    className={styles.root}
    id={id}
  >
    {label}
  </a>
);

TextLink.defaultProps = {
  id: undefined,
};

TextLink.propTypes = {
  /**
   * Link's `href` attribute.
   */
  href: PropTypes.string.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Link label.
   */
  label: PropTypes.string.isRequired,
};

export const LinkWithGlobalProps = withGlobalProps(TextLink, 'TextLink');

export default LinkWithGlobalProps;
