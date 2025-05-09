import type { ReactNode } from 'react';
import type {
  CleanedComponentProps,
  InputType,
  Layout,
  Priority,
  Size,
  Validation,
} from '../../types';

export type TextFieldProps = CleanedComponentProps<'input'> & {
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
   * Automatically set to `false` when the component is rendered within `InputGroup` component.
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
  type?: InputType;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: Validation;
  /**
   * Validation message to be displayed.
   *
   * Validation text is never rendered when the component is placed into `InputGroup`. Instead, the `InputGroup`
   * component itself renders all validation texts of its nested components.
   */
  validationText?: ReactNode;
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant?: Exclude<Priority, 'flat'>;
};
