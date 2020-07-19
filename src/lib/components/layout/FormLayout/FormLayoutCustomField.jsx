import PropTypes from 'prop-types';
import React from 'react';
import styles from './FormLayoutCustomField.scss';

const FormLayoutCustomField = ({
  children,
  id,
  label,
  layout,
}) => (
  <div
    id={id}
    className={`
      ${styles.root}
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
  id: undefined,
  label: null,
  layout: 'vertical',
};

FormLayoutCustomField.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default FormLayoutCustomField;
