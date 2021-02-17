import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import styles from './FormLayoutCustomField.scss';

export const FormLayoutCustomField = ({
  children,
  fullWidth,
  id,
  label,
  layout,
}) => (
  <div
    id={id}
    className={`
      ${styles.root}
      ${fullWidth ? styles.isRootFullWidth : ''}
      ${layout === 'vertical' ? styles.rootLayoutVertical : styles.rootLayoutHorizontal}
    `.trim()}
  >
    {label && (
      <div
        id={id && `${id}__label`}
        className={styles.label}
      >
        {label}
      </div>
    )}
    <div
      id={id && `${id}__field`}
      className={styles.field}
    >
      {children}
    </div>
  </div>
);

FormLayoutCustomField.defaultProps = {
  children: null,
  fullWidth: false,
  id: undefined,
  label: null,
  layout: 'vertical',
};

FormLayoutCustomField.propTypes = {
  /**
   * Custom HTML or React component(s).
   */
  children: PropTypes.node,
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Optional label of the field.
   */
  label: PropTypes.string,
  /**
   * Layout of the field, controlled by parent FormLayout.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

export const FormLayoutCustomFieldWithContext = withProviderContext(FormLayoutCustomField, 'FormLayoutCustomField');

export default FormLayoutCustomFieldWithContext;
