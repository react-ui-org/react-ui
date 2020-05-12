import PropTypes from 'prop-types';
import React from 'react';
import styles from './Card.scss';

const CardBody = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.body}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardBody;
