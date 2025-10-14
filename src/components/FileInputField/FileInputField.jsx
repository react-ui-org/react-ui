import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { TranslationsContext } from '../../providers/translations';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { InputGroupContext } from '../InputGroup';
import { Text } from '../Text';
import { FormLayoutContext } from '../FormLayout';
import styles from './FileInputField.module.scss';

/* istanbul ignore file */

export const FileInputField = React.forwardRef((props, ref) => {
  const {
    disabled,
    fullWidth,
    helpText,
    id,
    isLabelVisible,
    label,
    layout,
    multiple,
    onFilesChanged,
    required,
    size,
    validationState,
    validationText,
    ...restProps
  } = props;

  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContext = useContext(InputGroupContext);
  const translations = useContext(TranslationsContext);

  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const internalInputRef = useRef();

  const handleReset = useCallback((event) => {
    if (internalInputRef.current) {
      internalInputRef.current.value = '';
    }

    setSelectedFileNames([]);
    onFilesChanged([], event);
  }, [onFilesChanged]);

  // We need to have a reference to the input element to be able to call its methods,
  // but at the same time we want to expose this reference to the parent component in
  // case someone wants to call input methods from outside the component.
  useImperativeHandle(
    ref,
    () => {
      // The reason of extending object instead of using spread operator is that
      // if it is transformed to the object, it changes the reference of the object
      // and its prototype chain.
      const inputEl = internalInputRef?.current ?? {};
      inputEl.resetState = () => {
        handleReset(null);
      };
      return inputEl;
    },
    [handleReset],
  );

  const handleFileChange = (files, event) => {
    if (files.length === 0) {
      setSelectedFileNames([]);
      onFilesChanged([], event);
      return;
    }

    // Mimic the native behavior of the `input` element: if multiple files are selected and the input
    // does not accept multiple files, no files are processed.
    if (files.length > 1 && !multiple) {
      setSelectedFileNames([]);
      onFilesChanged([], event);
      return;
    }

    const fileNames = [];

    [...files].forEach((file) => {
      fileNames.push(file.name);
    });

    setSelectedFileNames(fileNames);
    onFilesChanged(files, event);
  };

  const handleInputChange = (event) => {
    handleFileChange(event.target.files, event);
  };

  const handleClick = () => {
    internalInputRef?.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileChange(event.dataTransfer.files, event);
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    if (!isDragging) {
      setIsDragging(true);
    }
    event.preventDefault();
  };

  const handleDragLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const inputEl = internalInputRef.current;
    if (!inputEl) {
      return () => {};
    }

    const { form } = inputEl;
    if (!form) {
      return () => {};
    }

    form.addEventListener('reset', handleReset);

    return () => {
      form.removeEventListener('reset', handleReset);
    };
  }, [handleReset]);

  return (
    <div
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        formLayoutContext && styles.isRootInFormLayout,
        resolveContextOrProp(formLayoutContext && formLayoutContext.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled) && styles.isRootDisabled,
        inputGroupContext && styles.isRootGrouped,
        isDragging && styles.isRootDragging,
        required && styles.isRootRequired,
        getRootSizeClassName(
          resolveContextOrProp(inputGroupContext && inputGroupContext.size, size),
          styles,
        ),
        getRootValidationStateClassName(validationState, styles),
      )}
      id={`${id}__root`}
      onDragLeave={!disabled ? handleDragLeave : undefined}
      onDragOver={!disabled ? handleDragOver : undefined}
      onDrop={!disabled ? handleDrop : undefined}
    >
      <label
        className={classNames(
          styles.label,
          (!isLabelVisible || inputGroupContext) && styles.isLabelHidden,
        )}
        htmlFor={id}
        id={`${id}__labelText`}
      >
        {label}
      </label>
      <div className={styles.field}>
        <div className={styles.inputContainer}>
          <input
            {...transferProps(restProps)}
            className={styles.input}
            disabled={resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled)}
            id={id}
            multiple={multiple}
            onChange={handleInputChange}
            ref={internalInputRef}
            required={required}
            tabIndex={-1}
            type="file"
          />
          <button
            className={styles.dropZone}
            disabled={resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled)}
            onClick={handleClick}
            type="button"
          >
            <Text lines={1}>
              {isDragging && (
                <span className={styles.dropFileHereText}>
                  {translations.FileInputField.dropFileHere}
                </span>
              )}
              {!isDragging && !selectedFileNames.length && (
                <>
                  <span className={styles.dropZoneLink}>{translations.FileInputField.browse}</span>
                  {' '}
                  {translations.FileInputField.drop}
                </>
              )}
              {!isDragging && selectedFileNames.length === 1 && selectedFileNames[0]}
              {!isDragging && selectedFileNames.length > 1 && (
                <>
                  {selectedFileNames.length}
                  {' '}
                  {translations.FileInputField.filesSelected}
                </>
              )}
            </Text>
          </button>
        </div>
        {helpText && (
          <div
            className={styles.helpText}
            id={`${id}__helpText`}
          >
            {helpText}
          </div>
        )}
        {validationText && (
          <div
            className={styles.validationText}
            id={`${id}__validationText`}
          >
            {validationText}
          </div>
        )}
      </div>
    </div>
  );
});

FileInputField.defaultProps = {
  disabled: false,
  fullWidth: false,
  helpText: null,
  isLabelVisible: true,
  layout: 'vertical',
  multiple: false,
  required: false,
  size: 'medium',
  validationState: null,
  validationText: null,
};

FileInputField.propTypes = {
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * Optional help text.
   */
  helpText: PropTypes.node,
  /**
   * ID of the `<input>` HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__label`
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   */
  id: PropTypes.string.isRequired,
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible: PropTypes.bool,
  /**
   * File input field label.
   */
  label: PropTypes.node.isRequired,
  /**
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   *
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * If `true`, the input will accept multiple files.
   */
  multiple: PropTypes.bool,
  /**
   * Callback fired when the value of the input changes.
   */
  onFilesChanged: PropTypes.func.isRequired,
  /**
   * If `true`, the input will be required.
   */
  required: PropTypes.bool,
  /**
   * Size of the field.
   *
   * Ignored if the component is rendered within `InputGroup` component as the value is inherited in such case.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  /**
   * Validation message to be displayed.
   */
  validationText: PropTypes.node,
};

export const FileInputFieldWithGlobalProps = withGlobalProps(FileInputField, 'FileInputField');

export default FileInputFieldWithGlobalProps;
