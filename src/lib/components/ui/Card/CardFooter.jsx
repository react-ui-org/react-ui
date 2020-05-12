import PropTypes from 'prop-types';
import React from 'react';
import styles from './Card.scss';

const CardFooter = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.footer}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardFooter;
