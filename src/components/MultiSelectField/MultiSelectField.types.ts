import type {
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  RefObject,
} from 'react';
import type {
  Layout,
  Size,
  State,
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
export type MultiSelectFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'value'> & {
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
   * ID of the combobox element: the `<input>` HTML element, or the `<div>` HTML element when search is disabled.
   * Generated automatically when not set.
   *
   * Also serves as a prefix for important inner elements:
   * * `<ID>__label`
   * * `<ID>__labelText`,
   * * `<ID>__helpText`
   * * `<ID>__validationText`
   * * `<ID>__dropdown`
   * * `<ID>__tagDescription`
   *
   * of individual options:
   * * `<ID>__item__<VALUE>`
   *
   * and of option groups:
   * * `<ID>__group__<LABEL>`
   *
   * If `key` in the option or group definition object is set, then `key` is used instead of `option.value`
   * or `group.label` in place of `<VALUE>` or `<LABEL>`. Whitespace in `<VALUE>` and `<LABEL>` is URL-encoded,
   * e.g. `Czech%20Republic`, so that the ID can be referenced by `aria-activedescendant` and `aria-labelledby`.
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
   * Option values must be unique across all options and groups, as the selection is an array of values.
   * Values are compared as strings when generating IDs, so `1` and `'1'` are the same option.
   *
   * For generating unique IDs the `option.value` is normally used. For cases when this is not practical
   * the `option.key` attribute can be set manually.
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
   * Alter the field to reflect the state of its data, e.g. a validation result or a change
   * against the saved value.
   */
  state?: State;
  /**
   * Validation message to be displayed.
   *
   * Validation text is never rendered when the component is placed into `InputGroup`. Instead, the `InputGroup`
   * component itself renders all validation texts of its nested components.
   */
  validationText?: ReactNode;
  /**
   * Array of selected option values. Each value is rendered as a tag labelled by the option label, or by the
   * value itself when no option has that value.
   */
  value: MultiSelectFieldOption['value'][];
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant?: MultiSelectFieldVariant;
};

// Internal types of the helpers, hooks and subcomponents. They are not exported from the component.

/**
 * Option flattened out of the groups, with the disabled state resolved from the group and the field.
 */
export type FlatOption = {
  disabled: boolean;
  key: NonNullable<MultiSelectFieldOption['key']> | MultiSelectFieldOption['value'];
  label: MultiSelectFieldOption['label'];
  value: MultiSelectFieldOption['value'];
};

/**
 * Move of the active option or the focused tag.
 */
export type IndexMove = 'next' | 'previous' | 'first' | 'last';

/**
 * Part of a flat option needed by the type-ahead search.
 */
export type TypeAheadOption = Pick<FlatOption, 'disabled' | 'label'>;

/**
 * Part of a keyboard event needed to map the key to an action.
 */
export type KeyActionEvent = {
  altKey?: boolean;
  ctrlKey?: boolean;
  key: string;
  metaKey?: boolean;
  shiftKey?: boolean;
};

/**
 * Action performed by a key pressed in the combobox.
 */
export type KeyAction = 'activateFirst'
  | 'activateLast'
  | 'activateNext'
  | 'activatePrevious'
  | 'close'
  | 'deactivate'
  | 'focusLastTag'
  | 'noop'
  | 'open'
  | 'openAndActivateFirst'
  | 'openAndActivateLast'
  | 'toggleActive'
  | 'typeAhead';

/**
 * State of the field the mapping of a key to an action depends on.
 */
export type KeyActionContext = {
  hasActiveOption: boolean;
  /** There is at least one selected value, i.e. a tag. */
  hasTags: boolean;
  /** The text cursor is collapsed at the start of the search text, always `true` without an editable input. */
  isCaretAtStart: boolean;
  /** The input accepts typing, i.e. search is enabled. */
  isEditable: boolean;
  isOpen: boolean;
  isSearchEmpty: boolean;
  /** Characters typed in quick succession are being collected for type-ahead. */
  isTypingAhead: boolean;
};

/**
 * Action performed by a key pressed on a tag.
 */
export type TagKeyAction = 'focusCombobox'
  | 'focusFirst'
  | 'focusLast'
  | 'focusNext'
  | 'focusPrevious'
  | 'openFirst'
  | 'openLast'
  | 'remove';

/**
 * Type-ahead of the select-only combobox, returned by `useMultiSelectFieldTypeAhead`.
 */
export type MultiSelectFieldTypeAhead = {
  /** Whether characters are being collected for a type-ahead search. */
  isTypingAhead: () => boolean;
  /** Adds the character to the type-ahead search. */
  typeAhead: (character: string) => void;
};

/**
 * Parameters of `useMultiSelectFieldState`.
 */
export type UseMultiSelectFieldStateParams = Pick<MultiSelectFieldProps, 'onChange' | 'options' | 'value'> & {
  isDisabled: boolean;
  searchAlgorithm: MultiSelectFieldProps['searchAlgorithm'];
};

/**
 * State of the field, returned by `useMultiSelectFieldState`.
 */
export type MultiSelectFieldState = {
  /** Makes the option reached by the move the active one. */
  activate: (move: IndexMove) => void;
  /** Makes the type-ahead match the active option and opens the dropdown. */
  activateTypeAheadMatch: (key: FlatOption['key'] | null) => void;
  activeOption: FlatOption | undefined;
  activeOptionIndex: number;
  /** Updates the search text. */
  changeSearch: (text: string) => void;
  /** Closes the dropdown and clears the active option and the search text. */
  closeDropdown: () => void;
  /** Removes the active option, the dropdown stays as it is. */
  deactivate: () => void;
  displayedOptions: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[];
  flatOptions: FlatOption[];
  isDropdownOpen: boolean;
  isSearchEnabled: boolean;
  /** Opens the dropdown and optionally makes an option active. */
  openDropdown: (activeOptionMove?: IndexMove) => void;
  /** Removes the value at the given index. */
  removeValue: (index: number) => void;
  search: string;
  /** Adds the option value to the selection, or removes it when it is already selected. */
  toggleValue: (optionValue: MultiSelectFieldOption['value']) => void;
};

/**
 * Parameters of `useMultiSelectFieldKeyboard`.
 */
export type UseMultiSelectFieldKeyboardParams = {
  comboboxRef: RefObject<HTMLInputElement | HTMLDivElement | null>;
  isDisabled: boolean;
  state: MultiSelectFieldState;
  value: MultiSelectFieldProps['value'];
};

/**
 * Keyboard handling and focus management of the field, returned by `useMultiSelectFieldKeyboard`.
 */
export type MultiSelectFieldKeyboard = {
  /** Moves the focus to the combobox. */
  focusCombobox: () => void;
  /** Handles a key press on the combobox and performs the mapped action. */
  handleComboboxKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  /** Performs the action of a key press on a tag. */
  handleTagKeyAction: (action: TagKeyAction | null, event: KeyboardEvent<HTMLDivElement>, index: number) => void;
  /** Stores the element of the tag at the given index. */
  registerTag: (index: number, element: HTMLDivElement | null) => void;
  /** Removes the tag at the given index and moves the focus to a neighbouring tag. */
  removeTag: (index: number) => void;
};
