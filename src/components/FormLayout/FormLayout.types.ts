import { Layout } from '../../types';
import { CheckboxFieldProps } from '../CheckboxField/CheckboxField.types';
import { FileInputFieldProps } from '../FileInputField/FileInputfield.types';
import { RadioProps } from '../Radio/Radio.types';
import { SelectFieldProps } from '../SelectField/SelectField.types';
import { TextAreaProps } from '../TextArea/TextArea.types';
import { TextFieldProps } from '../TextField/TextField.types';
import { ToggleProps } from '../Toggle/Toggle.types';
import { PREDEFINED_LABEL_WIDTH_VALUES } from './constants';
import { FormLayoutCustomFieldProps } from './FormLayoutCustomField.types';

export type FormLayoutProps = React.ComponentProps<'div'> & {
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
  labelWidth?: typeof PREDEFINED_LABEL_WIDTH_VALUES[number] | string;
};
