export interface TextFieldProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth?: boolean;
  /**
   * Optional help text.
   */
  helpText?: React.ReactNode;
  /**
   * ID of the input HTML element. It also serves as a prefix for nested elements:
   * * `<ID>__label`
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   */
  id?: string;
  /**
   * Width of the input field. Translated as `size` attribute for input types other than `number`.
   */
  inputSize?: number;
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible?: boolean;
  /**
   * Text field label.
   */
  label: string;
  /**
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   */
  layout?: Layout;
  /**
   * If `true`, the input will be required.
   */
  required?: boolean;
  /**
   * Size of the field.
   */
  size?: Size;
  /**
   * HTML input type, translated as `type` attribute of the input.
   */
  type?: InputType;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: Validation;
  /**
   * Validation message to be displayed.
   */
  validationText?: React.ReactNode;
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant?: Exclude<Priority, 'flat'>;
}
