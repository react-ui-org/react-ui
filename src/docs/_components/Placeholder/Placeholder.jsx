import PropTypes from 'prop-types';
import React from 'react';
import styles from './Placeholder.scss';

export const Placeholder = ({
  bordered,
  children,
  dark,
  height,
  inline,
  width,
}) => (
  <div
    className={[
      styles.root,
      bordered ? styles.rootBordered : '',
      dark ? styles.rootDark : '',
      inline ? styles.rootInline : '',
    ].join(' ')}
    style={{
      '--rui-local-height': height,
      '--rui-local-width': width,
    }}
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
  width: null,
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
  width: PropTypes.string,
};

export default Placeholder;
