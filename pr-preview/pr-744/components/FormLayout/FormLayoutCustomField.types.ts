import type {
  HTMLAttributes,
  ReactNode,
} from 'react';
import type {
  Size,
  ValidationState,
} from '../../types';

/**
 * Props of the `FormLayoutCustomField` component.
 */
export type FormLayoutCustomFieldProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Custom HTML or React component(s). If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * If `true`, label will be shown as disabled.
   */
  disabled?: boolean;
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth?: boolean;
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__field`
   * * `<ID>__label`
   */
  id?: string;
  /**
   * Size of contained form field used to properly align label.
   */
  innerFieldSize?: Size;
  /**
   * Optional label of the field.
   */
  label?: string;
  /**
   * Optional ID of labeled field to keep accessibility features. Only available if `label` is set.
   */
  labelForId?: string;
  /**
   * If `true`, label will be styled as required.
   */
  required?: boolean;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: ValidationState;
};

/**
 * `true` when rendered inside `FormLayoutCustomField`.
 */
export type FormLayoutCustomFieldContextValue = boolean;
