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
import {
  FileInputFieldProps, InputFieldWithResetState, ResetFileInputEventType,
} from './FileInputfield.types';
import styles from './FileInputField.module.scss';

export const FileInputField = React.forwardRef<InputFieldWithResetState, FileInputFieldProps>((props, ref) => {
  const {
    disabled = false,
    fullWidth = false,
    helpText,
    id,
    isLabelVisible = true,
    label,
    layout = 'vertical',
    required = false,
    multiple = false,
    onFilesChanged,
    size = 'medium',
    validationState,
    validationText,
    ...restProps
  } = props;

  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContext = useContext(InputGroupContext);
  const translations = useContext(TranslationsContext);

  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const internalInputRef = useRef<InputFieldWithResetState>(null);

  const handleReset = useCallback((event: Event) => {
    const retypedResetEvent = event as unknown as ResetFileInputEventType;
    const emptyFileList = new DataTransfer().files;

    setSelectedFileNames([]);
    onFilesChanged(emptyFileList, retypedResetEvent);
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
      const inputEl = (internalInputRef?.current ?? {}) as InputFieldWithResetState;
      inputEl.resetState = () => {
        handleReset(null as unknown as Event);
      };
      return inputEl;
    },
    [handleReset],
  );

  const handleFileChange = (
    files: FileList,
    event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (files.length === 0) {
      setSelectedFileNames([]);
      return;
    }

    // Mimic the native behavior of the `input` element: if multiple files are selected and the input
    // does not accept multiple files, no files are processed.
    if (files.length > 1 && !multiple) {
      setSelectedFileNames([]);
      return;
    }

    const fileNames = [];

    for (let i = 0; i <= files.length - 1; i += 1) {
      fileNames.push(files.item(i)?.name ?? '');
    }

    setSelectedFileNames(fileNames);
    onFilesChanged(files, event);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFileChange(event.target.files, event);
    }
  };

  const handleClick = () => {
    internalInputRef?.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileChange(event.dataTransfer.files, event);
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
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
              {!selectedFileNames.length && (
                <>
                  <span className={styles.dropZoneLink}>{translations.FileInputField.browse}</span>
                  {' '}
                  {translations.FileInputField.drop}
                </>
              )}
              {selectedFileNames.length === 1 && selectedFileNames[0]}
              {selectedFileNames.length > 1 && (
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

export const FileInputFieldWithGlobalProps = withGlobalProps(FileInputField, 'FileInputField');

export default FileInputFieldWithGlobalProps;
