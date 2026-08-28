import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './ModalFooter.module.scss';
import type { ModalFooterProps } from './Modal.types';

export const ModalFooter: React.FunctionComponent<ModalFooterProps> = ({
  children,
  justify = 'center',
  ...restProps
}: ModalFooterProps) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      getJustifyClassName(justify, styles),
    )}
  >
    {children}
  </div>
);

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
ModalFooter.propTypes = {
  /**
   * Content of the footer (preferably nested `Button` elements).
   */
  children: PropTypes.node.isRequired,
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between', 'stretch']),
};

export const ModalFooterWithGlobalProps = withGlobalProps<ModalFooterProps, never>(ModalFooter, 'ModalFooter');

export default ModalFooterWithGlobalProps;
