export interface RadioProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * If `true`, the input will be disabled.
   */
  disabled?: boolean;
  /**
   * Optional help text.
   */
  helpText?: React.ReactNode;
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__labelText`
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   *
   * and of individual options (`<input>`):
   * * `<ID>__item__<VALUE>`
   * * `<ID>__item__<VALUE>__label`
   * * `<ID>__item__<VALUE>__labelText`
   *
   * If `key` in the option definition object is set,
   * then `option.key` is used instead of `option.value` in place of `<VALUE>`.
   */
  id?: string;
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible?: boolean;
  /**
   * Label of the group of options.
   */
  label: string;
  /**
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   */
  layout?: Layout;
  /**
   * Set of options to be chosen from.
   *
   * For generating unique IDs the `option.value` is normally used. For cases when this is not practical or
   * the `option.value` values are not unique the `option.key` attribute can be set manually.
   */
  options: {
    disabled?: boolean;
    key?: string;
    label: string;
    value?: string | number;
  }[];
  /**
   * If `true`, the input will be required.
   */
  required?: boolean;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: Validation;
  /**
   * Validation message to be displayed.
   */
  validationText?: React.ReactNode;
  /**
   * Value of the input.
   */
  value?: string | number;
}
