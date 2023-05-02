export type OptionOfOption = {
  disabled?: boolean;
  key?: string;
  label: string;
  value: string | number;
};

export type OptionType = {
  disabled?: boolean;
  key?: string;
  label: string;
  value: string | number;
} | {
  key?: string;
  label: string;
  options?: OptionOfOption[];
};

export interface SelectFieldProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
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
  helpText?: React.ReactNode;
  /**
   * ID of the input HTML element.
   *
   * Also serves as a prefix for important inner elements:
   * * `<ID>__label`
   * * `<ID>__labelText`,
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   *
   * and of individual options:
   * * `<ID>__item__<VALUE>`
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
   * Select field label.
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
   * Either set of individual or grouped options is acceptable.
   *
   * For generating unique IDs the `option.value` is normally used. For cases when this is not practical or
   * the `option.value` values are not unique the `option.key` attribute can be set manually.
   * The same applies for the `label` value of grouped options which is supposed to be unique.
   * To ensure uniqueness `key` attribute can be set manually.
   */
  options: OptionType[];
  /**
   * If `true`, the input will be required.
   */
  required?: boolean;
  /**
   * Size of the field.
   */
  size?: Size;
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState?: Validation;
  /**
   * Validation message to be displayed.
   */
  validationText?: React.ReactNode;
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant?: Exclude<Priority, 'flat'>;
}

export interface OptionProps {
  /**
   * If `true` the option cannot be selected.
   */
  disabled?: boolean;
  /**
   * ID of an individual option.
   */
  id?: string;
  /**
   * Option label.
   */
  label: string;
  /**
   * Option value.
   */
  value: string | number;
}
