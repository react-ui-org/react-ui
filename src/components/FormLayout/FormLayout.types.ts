import type {
  CleanedComponentPropsWithChildren,
  Layout,
} from '../../types';
import type { CheckboxFieldProps } from '../CheckboxField/CheckboxField.types';
import type { FileInputFieldProps } from '../FileInputField/FileInputfield.types';
import type { RadioProps } from '../Radio/Radio.types';
import type { SelectFieldProps } from '../SelectField/SelectField.types';
import type { TextAreaProps } from '../TextArea/TextArea.types';
import type { TextFieldProps } from '../TextField/TextField.types';
import type { ToggleProps } from '../Toggle/Toggle.types';
import type { FormLayoutCustomFieldProps } from './FormLayoutCustomField.types';

export type FormLayoutProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * If `true`, FormLayout will take up only as much horizontal space as necessary.
   */
  autoWidth?: boolean;
  /**
   * Supported form field components:
   * * `CheckboxField`
   * * `FileInputField`
   * * `FormLayoutCustomField`
   * * `Radio`
   * * `SelectField`
   * * `TextArea`
   * * `TextField`
   * * `Toggle`
   *
   * If none are provided nothing is rendered.
   */
  children?: React.JSXElementConstructor<
  CheckboxFieldProps
  | FileInputFieldProps
  | FormLayoutCustomFieldProps
  | RadioProps
  | SelectFieldProps
  | TextAreaProps
  | TextFieldProps
  | ToggleProps
  >[];
  /**
   * Layout that is forced on children form fields.
   */
  fieldLayout?: Layout;
  /**
   * Width of the column with form field labels. Only available if the `fieldLayout` is set to
   * `horizontal`.
   */
  labelWidth?: string;
};
