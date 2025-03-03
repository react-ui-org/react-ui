import PropTypes from 'prop-types';
import React, {
  useContext,
  useState,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { TranslationsContext } from '../../providers/translations';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { InputGroupContext } from '../InputGroup';
import { Text } from '../Text';
import { FormLayoutContext } from '../FormLayout';
import styles from './FileInputField.module.scss';

export const FileInputField = React.forwardRef((props, ref) => {
  const {
    disabled,
    fullWidth,
    helpText,
    id,
    isLabelVisible,
    label,
    layout,
    required,
    size,
    validationState,
    validationText,
    ...restProps
  } = props;

  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContext = useContext(InputGroupContext);
  const translations = useContext(TranslationsContext);

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFileName(file.name);
  };

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        formLayoutContext && styles.isRootInFormLayout,
        resolveContextOrProp(formLayoutContext && formLayoutContext.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled) && styles.isRootDisabled,
        inputGroupContext && styles.isRootGrouped,
        required && styles.isRootRequired,
        getRootSizeClassName(
          resolveContextOrProp(inputGroupContext && inputGroupContext.size, size),
          styles,
        ),
        getRootValidationStateClassName(validationState, styles),
      )}
      htmlFor={id}
      id={id && `${id}__label`}
    >
      <div
        className={classNames(
          styles.label,
          (!isLabelVisible || inputGroupContext) && styles.isLabelHidden,
        )}
        id={id && `${id}__labelText`}
      >
        {label}
      </div>
      <div className={styles.field}>
        <div className={styles.inputContainer}>
          <input
            {...transferProps(restProps)}
            className={styles.input}
            disabled={resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled)}
            id={id}
            onChange={handleFileChange}
            ref={ref}
            required={required}
            type="file"
          />
          <div className={styles.dropZone}>
            {selectedFileName && (
              <Text lines={1}>{selectedFileName}</Text>
            )}
            {!selectedFileName && (
              <>
                {translations.FileInputField.drop}
                {' '}
                <span className={styles.dropZoneLink}>{translations.FileInputField.browse}</span>
              </>
            )}
          </div>
        </div>
        {helpText && (
          <div
            className={styles.helpText}
            id={id && `${id}__helpText`}
          >
            {helpText}
          </div>
        )}
        {validationText && (
          <div
            className={styles.validationText}
            id={id && `${id}__validationText`}
          >
            {validationText}
          </div>
        )}
      </div>
    </label>
  );
});

FileInputField.defaultProps = {
  disabled: false,
  fullWidth: false,
  helpText: null,
  id: undefined,
  isLabelVisible: true,
  layout: 'vertical',
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
  id: PropTypes.string,
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
