import PropTypes from 'prop-types';
import React from 'react';
import styles from './Placeholder.scss';

export const Placeholder = ({
  bordered,
  children,
  dark,
  height,
  inline,
}) => (
  <div
    className={[
      styles.root,
      bordered ? styles.rootBordered : '',
      dark ? styles.rootDark : '',
      inline ? styles.rootInline : '',
    ].join(' ')}
    style={height && { '--rui-local-height': height }}
  >
    {children}
  </div>
);

Placeholder.defaultProps = {
  bordered: false,
  children: null,
  dark: false,
  height: null,
  inline: false,
};

Placeholder.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  dark: PropTypes.bool,
  height: PropTypes.string,
  inline: PropTypes.bool,
};

export default Placeholder;
