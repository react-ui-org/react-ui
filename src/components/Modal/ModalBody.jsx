import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { getScrollingClassName } from './_helpers/getScrollingClassName';
import styles from './ModalBody.module.scss';

export const ModalBody = ({
  children,
  scrolling,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        getScrollingClassName(scrolling, styles),
      )}
    >
      {children}
    </div>
  );
};

ModalBody.defaultProps = {
  children: null,
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
