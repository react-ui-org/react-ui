import PropTypes from 'prop-types';
import React from 'react';
import styles from './Placeholder.scss';

export const Placeholder = ({
  bordered,
  children,
  height,
}) => (
  <div
    className={[
      styles.root,
      bordered ? styles.isRootBordered : '',
    ].join(' ')}
    style={height && { '--rui-local-height': height }}
  >
    {children}
  </div>
);

Placeholder.defaultProps = {
  bordered: false,
  children: null,
  height: null,
};

Placeholder.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  height: PropTypes.string,
};

export default Placeholder;
