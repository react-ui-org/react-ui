import PropTypes from 'prop-types';
import React from 'react';
import styles from './List.scss';

const List = (props) => {
  const {
    align,
    autoWidth,
    children,
  } = props;

  if (!props.children) {
    return null;
  }

  let alignClass = '';

  if (align === 'left') {
    alignClass = styles.alignLeft;
  } else if (align === 'right') {
    alignClass = styles.alignRight;
  }

  let autoWidthClass = '';

  if (autoWidth) {
    autoWidthClass = styles.isAutoWidth;
  }

  return (
    <div
      className={`
        ${styles.root}
        ${autoWidthClass}
      `.trim()}
    >
      <ul
        className={`
          ${styles.list}
          ${alignClass}
        `.trim()}
      >
        {children}
      </ul>
    </div>
  );
};

List.defaultProps = {
  align: 'left',
  autoWidth: false,
  children: null,
};

List.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  autoWidth: PropTypes.bool,
  children: PropTypes.node,
};

export default List;
