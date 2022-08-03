import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './ModalBody.scss';

export const ModalBody = ({
  children,
  id,
  withScrollView,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.root,
        withScrollView && styles.isRootScrollable,
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
  withScrollView: false,
};

ModalBody.propTypes = {
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalContent`
   * * `ScrollView` (`withScrollView: true` must be set)
   *
   * At most one nested element is allowed. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * If `true`, body is scroll-compatible and its child must be instance of `ScrollView`.
   */
  withScrollView: PropTypes.bool,
};

export const ModalBodyWithGlobalProps = withGlobalProps(ModalBody, 'ModalBody');

export default ModalBodyWithGlobalProps;
