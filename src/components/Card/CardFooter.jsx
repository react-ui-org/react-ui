import PropTypes from 'prop-types';
import React from 'react';
import { transferProps } from '../../jsHelpers/transferProps/transferProps';
import { withGlobalProps } from '../../providers/globalProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Card.module.scss';

export const CardFooter = ({
  children,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={styles.footer}
    >
      {children}
    </div>
  );
};

CardFooter.defaultProps = {
  children: null,
};

CardFooter.propTypes = {
  /**
   * Card actions, usually buttons.
   */
  children: PropTypes.node,
};

export const CardFooterWithGlobalProps = withGlobalProps(CardFooter, 'CardFooter');

export default CardFooterWithGlobalProps;
