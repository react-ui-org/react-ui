import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './TextLink.scss';
import { TextLinkProps } from './TextLink.types';

export const TextLink: React.FunctionComponent<TextLinkProps> = ({
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

export const LinkWithGlobalProps = withGlobalProps(TextLink, 'TextLink');

export default LinkWithGlobalProps;
