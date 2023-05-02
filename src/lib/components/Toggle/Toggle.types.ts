export interface ToggleProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean;
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
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible?: boolean;
  /**
   * Toggle label.
   */
  label: string;
  /**
   * Placement of the label relative to the input.
   */
  labelPosition?: Position;
  /**
   * If `true`, the input will be required.
   */
  required?: boolean;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: Validation;
  /**
   * Validation message to be displayed.
   */
  validationText?: React.ReactNode;
}
