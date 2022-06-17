import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './List.scss';

export const List = ({
  align,
  autoWidth,
  children,
  id,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  let alignClass;

  if (align === 'start') {
    alignClass = styles.alignStart;
  } else if (align === 'end') {
    alignClass = styles.alignEnd;
  }

  let autoWidthClass;

  if (autoWidth) {
    autoWidthClass = styles.isAutoWidth;
  }

  return (
    <div
      className={classNames(
        styles.root,
        autoWidthClass,
      )}
      id={id}
    >
      <ul
        className={classNames(
          styles.list,
          alignClass,
        )}
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
  id: undefined,
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
   * Individual ListItems. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const ListWithGlobalProps = withGlobalProps(List, 'List');

export default ListWithGlobalProps;
