import type {
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import type {
  LabelPosition,
  ValidationState,
} from '../../types';

export type CheckboxFieldLabelPosition = LabelPosition;

/**
 * Props of the `CheckboxField` component.
 */
export type CheckboxFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean;
  /**
   * Optional help text.
   */
  helpText?: ReactNode;
  /**
   * ID of the `<input>` HTML element.
   *
   * Also serves as base for ids of nested elements:
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
   * Checkbox field label.
   */
  label: ReactNode;
  /**
   * Placement of the label relative to the input.
   */
  labelPosition?: CheckboxFieldLabelPosition;
  /**
   * If `true`, the input will be rendered as if it was required.
   */
  renderAsRequired?: boolean;
  /**
   * If `true`, the input will be made and rendered as required, regardless of the `renderAsRequired` prop.
   */
  required?: boolean;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: ValidationState;
  /**
   * Validation message to be displayed.
   */
  validationText?: ReactNode;
};
