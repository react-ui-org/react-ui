import type {
  HTMLAttributes,
  ReactNode,
} from 'react';
import type {
  Layout,
  Size,
  ValidationState,
} from '../../types';

export type MultiSelectFieldOption = {
  disabled?: boolean;
  key?: string;
  label: string;
  value: string | number;
};

export type MultiSelectFieldOptionGroup = {
  disabled?: boolean;
  key?: string;
  label: string;
  options: MultiSelectFieldOption[];
};

/**
 * Search algorithm filtering the options by the text typed into the search input.
 */
export type MultiSelectFieldSearchAlgorithm = (
  options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[],
  searchString: string,
) => (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[];

export type MultiSelectFieldVariant = 'filled' | 'outline';

/**
 * Props of the `MultiSelectField` component.
 */
export type MultiSelectFieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
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
   * ID of the input HTML element.
   *
   * Also serves as a prefix for important inner elements:
   * * `<ID>__label`
   * * `<ID>__labelText`,
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   * * `<ID>__dropdown`
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
   *
   * Automatically set to `false` when the component is rendered within `InputGroup` component.
   */
  isLabelVisible?: boolean;
  /**
   * Multi select field label.
   */
  label: ReactNode;
  /**
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   */
  layout?: Layout;
  /**
   * Callback fired when the selection changes. Called with the new array of selected
   * option values.
   */
  onChange: (value: MultiSelectFieldOption['value'][]) => void;
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
  options: MultiSelectFieldOption[] | MultiSelectFieldOptionGroup[];
  /**
   * If `true`, the input will be rendered as if it was required.
   */
  renderAsRequired?: boolean;
  /**
   * If `true`, the input will be made and rendered as required, regardless of the `renderAsRequired` prop.
   */
  required?: boolean;
  /**
   * Search algorithm used to filter the options by the text typed into the search input.
   * The function is called with the `options` array and the search string and returns
   * the options to be displayed.
   *
   * Defaults to the provided `caseInsensitiveAccentSensitivePrefixSearch` algorithm.
   * Set to `null` to disable searching.
   */
  searchAlgorithm?: MultiSelectFieldSearchAlgorithm | null;
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
   * Validation text is never rendered when the component is placed into `InputGroup`. Instead, the `InputGroup`
   * component itself renders all validation texts of its nested components.
   */
  validationText?: ReactNode;
  /**
   * Array of selected option values.
   */
  value: MultiSelectFieldOption['value'][];
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant?: MultiSelectFieldVariant;
};
