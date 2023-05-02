export interface FormLayoutProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
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
  children?: React.ReactNode;
  /**
   * Layout that is forced on children form fields.
   */
  fieldLayout?: Layout;
  /**
   * Width of the column with form field labels. Only available if the `fieldLayout` is set to
   * `horizontal`.
   */
  labelWidth?: PredefinedLabelWidthValues | string;
}

export interface FormLayoutCustomFieldProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Custom HTML or React component(s). If none are provided nothing is rendered.
   */
  children?: React.ReactNode,
  /**
   * If `true`, label will be shown as disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth?: boolean,
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__field`
   * * `<ID>__label`
   */
  id?: string,
  /**
   * Size of contained form field used to properly align label.
   */
  innerFieldSize?: Size,
  /**
   * Optional label of the field.
   */
  label?: string,
  /**
   * Optional ID of labeled field to keep accessibility features. Only available if `label` is set.
   */
  labelForId?: string,
  /**
   * If `true`, label will be styled as required.
   */
  required?: boolean,
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: Validation,
}
