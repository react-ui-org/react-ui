import PropTypes from 'prop-types';
import React from 'react';
import styles from './FormLayoutCustomField.scss';

const FormLayoutCustomField = ({
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
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default FormLayoutCustomField;
