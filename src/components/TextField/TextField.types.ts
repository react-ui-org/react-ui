import type {
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import type {
  Layout,
  Size,
  ValidationState,
} from '../../types';

export type TextFieldType = 'email' | 'number' | 'password' | 'tel' | 'text';

export type TextFieldVariant = 'filled' | 'outline';

/**
 * Props of the `TextField` component.
 */
export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
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
   *
   * Help text is never rendered when the component is placed into `InputGroup`.
   * If a help text is needed, it must be defined on the `InputGroup` component instead.
   */
  helpText?: ReactNode;
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
   *
   * Automatically set to `false` when the component is rendered within `InputGroup` or
   * `FormLayoutCustomField` component.
   */
  isLabelVisible?: boolean;
  /**
   * Text field label.
   */
  label: ReactNode;
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
   *
   * Ignored if the component is rendered within `InputGroup` component as the value is inherited in such case.
   */
  size?: Size;
  /**
   * HTML input type, translated as `type` attribute of the input.
   */
  type?: TextFieldType;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: ValidationState;
  /**
   * Validation message to be displayed.
   *
   * Validation text is never rendered when the component is placed into `InputGroup`.
   * If a validation text is needed, it must be defined on the `InputGroup` component instead.
   */
  validationText?: ReactNode;
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant?: TextFieldVariant;
};
