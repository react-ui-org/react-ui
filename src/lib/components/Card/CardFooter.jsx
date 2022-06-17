import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Card.scss';

export const CardFooter = ({
  children,
  id,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div className={styles.footer} id={id}>
      {children}
    </div>
  );
};

CardFooter.defaultProps = {
  children: null,
  id: undefined,
};

CardFooter.propTypes = {
  /**
   * Card actions, usually buttons.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const CardFooterWithGlobalProps = withGlobalProps(CardFooter, 'CardFooter');

export default CardFooterWithGlobalProps;
