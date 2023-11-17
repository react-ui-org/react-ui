import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './TextLink.scss';

export const TextLink = ({
  href,
  label,
  ...restProps
}) => (
  <a
    {...transferProps(restProps)}
    className={styles.root}
    href={href}
  >
    {label}
  </a>
);

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

export const LinkWithGlobalProps = withGlobalProps(TextLink, 'TextLink');

export default LinkWithGlobalProps;
