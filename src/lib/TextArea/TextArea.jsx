import PropTypes from 'prop-types';
import React from 'react';
import styles from './TextArea.scss';

const TextArea = (props) => {
  const {
    changeHandler,
    description,
    error,
    isLabelVisible,
    fieldId,
    ...otherProps
  } = props;

  let labelClass = styles.label;
  if (isLabelVisible) {
    if (props.required) {
      labelClass = styles.isLabelRequired;
    }
  } else {
    labelClass = styles.isLabelHidden;
  }

  return (
    <div className={styles.root}>
      <label htmlFor={fieldId}>
        <div className={labelClass}>
          {props.label}
        </div>
        <textarea
          {...otherProps}
          id={fieldId}
          onChange={changeHandler}
          className={error ? styles.isInputInvalid : styles.input}
        />
      </label>
      {description && (
        <div className={styles.description}>
          {description}
        </div>
      )}
      {error && (
        <div className={styles.error}>
          {error}
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
