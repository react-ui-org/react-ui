import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toggle.scss';

const Toggle = (props) => {
  let labelVisibilityClass = '';
  let labelPositionClass = '';

  if (!props.isLabelVisible) {
    labelVisibilityClass = styles.isLabelHidden;
  }

  if (props.labelPosition === 'before') {
    labelPositionClass = styles.labelPositionBefore;
  } else if (props.labelPosition === 'after') {
    labelPositionClass = styles.labelPositionAfter;
  }

  return (
    <div
      className={(`
        ${styles.root}
        ${labelPositionClass}
      `).trim()}
    >
      <label htmlFor={props.fieldId} className={styles.inputWrap}>
        <input
          id={props.fieldId}
          name={props.fieldId}
          value={props.value}
          onChange={props.changeHandler}
          disabled={props.disabled}
          checked={props.checked}
          required={props.required}
          type="checkbox"
          className={styles.input}
        />
        <span className={styles.label}>
          <span
            className={(`
              ${styles.labelInner}
              ${labelVisibilityClass}
            `).trim()}
          >
            {props.label}
          </span>
        </span>
        <span className={styles.toggle} />
      </label>
      {props.description && (
        <div className={styles.description}>
          {props.description}
        </div>
      )}
      {props.error && (
        <div className={styles.error}>
          {props.error}
        </div>
      )}
    </div>
  );
};

Toggle.defaultProps = {
  changeHandler: null,
  checked: false,
  description: null,
  disabled: false,
  error: null,
  isLabelVisible: true,
  labelPosition: 'after',
  required: false,
  value: undefined,
};

Toggle.propTypes = {
  changeHandler: PropTypes.func,
  checked: PropTypes.bool,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.oneOf(['before', 'after']),
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Toggle;
