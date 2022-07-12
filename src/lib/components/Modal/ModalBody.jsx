import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getScrollingClassName } from './_helpers/getScrollingClassName';
import styles from './ModalBody.scss';

export const ModalBody = ({
  children,
  id,
  scrolling,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.root,
        getScrollingClassName(scrolling, styles),
      )}
      id={id}
    >
      {children}
    </div>
  );
};

ModalBody.defaultProps = {
  children: null,
  id: undefined,
  scrolling: 'auto',
};

ModalBody.propTypes = {
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalContent`
   * * `ScrollView` (`scrolling: 'custom'` must be set)
   *
   * You can also provide a custom component responsible for scrolling and displaying content correctly.
   * At most one nested element is allowed. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Scrolling mode:
   *
   * - `auto`: scrolling is enabled on ModalBody.
   * - `custom`: use if providing a custom scrolling component, e.g. an instance of `ScrollView`.
   * - `none`: scrolling is disabled on ModalBody and the entire Modal is scrollable instead.
   */
  scrolling: PropTypes.oneOf(['auto', 'custom', 'none']),
};

export const ModalBodyWithGlobalProps = withGlobalProps(ModalBody, 'ModalBody');

export default ModalBodyWithGlobalProps;
