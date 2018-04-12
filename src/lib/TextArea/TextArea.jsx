import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextArea.scss';

const TextArea = (props) => {
  let labelClass = styles.label;
  if (props.isLabelVisible) {
    if (props.required) {
      labelClass = styles.isLabelRequired;
    }
  } else {
    labelClass = styles.isLabelHidden;
  }

  return (
    <div className={styles.root}>
      <label htmlFor={props.fieldId}>
        <div className={labelClass}>
          {props.label}
        </div>
        <textarea
          id={props.fieldId}
          placeholder={props.placeholder}
          required={props.required}
          rows={props.rows}
          value={props.value}
          onChange={props.changeHandler}
          className={props.error ? styles.isInputInvalid : styles.input}
        />
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

TextArea.defaultProps = {
  changeHandler: null,
  description: null,
  error: null,
  isLabelVisible: true,
  placeholder: null,
  required: false,
  rows: 3,
  value: undefined,
};

TextArea.propTypes = {
  changeHandler: PropTypes.func,
  description: PropTypes.string,
  error: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  isLabelVisible: PropTypes.bool,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TextArea;
