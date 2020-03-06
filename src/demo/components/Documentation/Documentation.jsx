import PropTypes from 'prop-types';
import React from 'react';
import styles from './Documentation.scss';

const Documentation = (props) => (
  <div className={styles.root}>
    <h2 className="typography-size-1">{props.name}</h2>
    <div className={styles.sandbox}>
      {props.component}
    </div>
  </div>
);

Documentation.propTypes = {
  component: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
};

export default Documentation;
