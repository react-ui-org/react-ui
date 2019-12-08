import PropTypes from 'prop-types';
import React from 'react';
import styles from './CardList.scss';

const CardList = (props) => {
  const {
    children,
    id,
    ...other
  } = props;

  if (!props.children) {
    return null;
  }

  return (
    <div
      id={id}
      className={styles.root}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          inList: true,
        });
      })}
    </div>
  );
};

CardList.defaultProps = {
  children: null,
  id: undefined,
};

CardList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string,
};

export default CardList;
