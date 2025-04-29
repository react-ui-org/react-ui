import type {
  ReactNode,
  DragEvent,
  ChangeEvent,
} from 'react';
import type {
  CleanedComponentProps,
  Layout,
  Size,
  Validation,
} from '../../types';

export type InputFieldWithResetState = HTMLInputElement & {
  resetState: () => void;
};

export type ResetFileInputEventType = ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement> | null;

export type FileInputFieldProps = CleanedComponentProps<'input'> & {
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
  multiple: boolean;
  /**
   * Callback fired when the value of the input changes.
   */
  onFilesChanged: (files: FileList, event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement> | null) => void;
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
  validationState?: Validation;
  /**
   * Validation message to be displayed.
   */
  validationText?: ReactNode;
};
