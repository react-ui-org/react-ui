import type { ReactNode } from 'react';
import type {
  CleanedComponentProps,
  Size,
  Validation,
} from '../../types';

export type FormLayoutCustomFieldProps = CleanedComponentProps<'div'> & {
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
  validationState?: Validation;
};
