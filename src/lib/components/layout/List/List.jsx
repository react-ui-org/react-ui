import PropTypes from 'prop-types';
import React from 'react';
import styles from './List.scss';

export const List = ({
  align,
  autoWidth,
  children,
}) => {
  if (!children) {
    return null;
  }

  let alignClass = '';

  if (align === 'start') {
    alignClass = styles.alignStart;
  } else if (align === 'end') {
    alignClass = styles.alignEnd;
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
  align: 'start',
  autoWidth: false,
  children: null,
};

List.propTypes = {
  /**
   * Horizontal alignment of list items.
   */
  align: PropTypes.oneOf(['start', 'end']),
  /**
   * If `true`, the list items will take up only as much horizontal space as necessary.
   */
  autoWidth: PropTypes.bool,
  /**
   * Individual ListItems.
   */
  children: PropTypes.node,
};

export default List;
