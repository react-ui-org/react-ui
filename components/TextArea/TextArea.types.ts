import type {
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import type {
  Layout,
  Size,
  ValidationState,
} from '../../types';

export type TextAreaVariant = 'filled' | 'outline';

/**
 * Props of the `TextArea` component.
 */
export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
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
  helpText?: ReactNode;
  /** ID of the input HTML element. It also serves as a prefix for nested elements:
   * * `<ID>__label`
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   */
  id?: string;
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   *
   * Automatically set to `false` when the component is rendered within `FormLayoutCustomField`
   * component.
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
   */
  size?: Size;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: ValidationState;
  /**
   * Validation message to be displayed.
   */
  validationText?: ReactNode;
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant?: TextAreaVariant;
};
