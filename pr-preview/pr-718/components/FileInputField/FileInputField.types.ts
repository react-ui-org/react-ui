import type {
  ChangeEvent,
  DragEvent,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import type {
  Layout,
  Size,
  ValidationState,
} from '../../types';

export type FileInputFieldFilesChangedEvent = ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement> | Event | null;

/**
 * Element exposed through `ref`: the `<input>` element extended with `resetState()`.
 */
export type FileInputFieldRef = HTMLInputElement & {
  resetState: () => void;
};

/**
 * Props of the `FileInputField` component.
 */
export type FileInputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'size' | 'type'> & {
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
   * ID of the `<input>` HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__label`
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   */
  id: string;
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   *
   * Automatically set to `false` when the component is rendered within `FormLayoutCustomField`
   * component.
   */
  isLabelVisible?: boolean;
  /**
   * File input field label.
   */
  label: ReactNode;
  /**
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   *
   */
  layout?: Layout;
  /**
   * If `true`, the input will accept multiple files.
   */
  multiple?: boolean;
  /**
   * Callback fired when the value of the input changes.
   */
  onFilesChanged: (files: FileList | File[], event: FileInputFieldFilesChangedEvent) => void;
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
};
