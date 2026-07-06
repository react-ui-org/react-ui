import PropTypes from 'prop-types';
import React, {
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { useClickOutside } from '../../hooks/useClickOutside';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout';
import { InputGroupContext } from '../InputGroup';
import { MultiSelectFieldDropdown } from './_components/MultiSelectFieldDropdown';
import { MultiSelectFieldSearchInput } from './_components/MultiSelectFieldSearchInput';
import { MultiSelectFieldTag } from './_components/MultiSelectFieldTag';
import { getOptionsLabelMap } from './_helpers/getOptionsLabelMap';
import { isPrintableCharacterKey } from './_helpers/isPrintableCharacterKey';
import { keyDetected } from './_helpers/keyDetected';
import {
  caseInsensitiveAccentSensitivePrefixSearch,
} from './_searchAlgorithms/caseInsensitiveAccentSensitivePrefixSearch';
import keyBindings from './keyBindings';
import styles from './MultiSelectField.module.scss';

export const MultiSelectField = React.forwardRef((props, ref) => {
  const {
    disabled,
    fullWidth,
    helpText,
    id,
    isLabelVisible,
    label,
    layout,
    onChange,
    options,
    renderAsRequired,
    required,
    searchAlgorithm,
    size,
    validationState,
    validationText,
    variant,
    value,
    ...restProps
  } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);
  const optionsRef = useRef([]);
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const tagsRef = useRef([]);

  const optionsLabelMap = useMemo(() => getOptionsLabelMap(options), [options]);

  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContext = useContext(InputGroupContext);

  const resolvedDisabled = resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled);
  const resolvedSize = resolveContextOrProp(inputGroupContext && inputGroupContext.size, size);

  const isSearchEnabled = searchAlgorithm != null;
  const displayedOptions = (isSearchEnabled && search.length > 0)
    ? searchAlgorithm(options, search)
    : options;

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setSearch('');
    if (searchRef.current) {
      searchRef.current.textContent = '';
    }
  };

  const closeDropdownAndFocusInput = () => {
    closeDropdown();
    inputRef.current?.focus();
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
    if (isSearchEnabled) {
      searchRef.current?.focus();
    }
  };

  useClickOutside(rootRef, () => {
    if (isDropdownOpen) {
      closeDropdown();
    }
  });

  return (
    <label
      className={classNames(
        styles.root,
        fullWidth && styles.isRootFullWidth,
        formLayoutContext && styles.isRootInFormLayout,
        isDropdownOpen && styles.isRootDropdownOpen,
        resolvedDisabled && styles.isRootDisabled,
        resolveContextOrProp(formLayoutContext && formLayoutContext.layout, layout) === 'horizontal'
          ? styles.isRootLayoutHorizontal
          : styles.isRootLayoutVertical,
        inputGroupContext && styles.isRootGrouped,
        (renderAsRequired || required) && styles.isRootRequired,
        getRootSizeClassName(
          resolvedSize,
          styles,
        ),
        getRootValidationStateClassName(validationState, styles),
        variant === 'filled' ? styles.isRootVariantFilled : styles.isRootVariantOutline,
      )}
      htmlFor={id}
      id={id && `${id}__label`}
      onBlur={(event) => {
        // Close the dropdown when the focus moves out of the component. When `relatedTarget` is
        // `null` (focus lost by clicking a non-focusable element), closing is left to the
        // click-outside handler so that clicks inside the component do not close the dropdown.
        if (
          isDropdownOpen
          && event.relatedTarget !== null
          && rootRef.current
          && !rootRef.current.contains(event.relatedTarget)
        ) {
          closeDropdown();
        }
      }}
      ref={rootRef}
    >
      <div
        className={classNames(
          styles.label,
          (!isLabelVisible || inputGroupContext) && styles.isLabelHidden,
        )}
        id={id && `${id}__labelText`}
      >
        {label}
      </div>
      <div className={styles.field}>
        <div className={styles.inputContainer}>
          <div
            {...transferProps(restProps)}
            aria-controls={id && `${id}__dropdown`}
            aria-disabled={resolvedDisabled}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            aria-labelledby={id && `${id}__labelText`}
            aria-required={required}
            className={styles.input}
            id={id}
            onClick={(event) => {
              if (resolvedDisabled) {
                return;
              }

              // Clicks inside the search input must not close the open dropdown, e.g. when
              // the user positions the cursor within the search text.
              if (isDropdownOpen && searchRef.current?.contains(event.target)) {
                return;
              }

              if (isDropdownOpen) {
                closeDropdown();
              } else {
                openDropdown();
              }
            }}
            onKeyDown={(event) => {
              // Key presses on tags and on the search input are handled by themselves and
              // must not be processed a second time when they bubble up here.
              if (resolvedDisabled || event.target !== event.currentTarget) {
                return;
              }

              if (isDropdownOpen && keyDetected(event, keyBindings.closeDropdown)) {
                event.preventDefault();
                closeDropdownAndFocusInput();
                return;
              }

              if (keyDetected(
                event,
                [
                  ...keyBindings.focusNextDropdownItem,
                  ...keyBindings.focusPreviousDropdownItem,
                  ...keyBindings.openDropdown,
                ],
              )) {
                event.preventDefault();
                openDropdown();
                return;
              }

              // Typing a character opens the dropdown and moves focus to the search input.
              // The default action is intentionally kept so the typed character is inserted
              // into the freshly focused search input.
              if (isSearchEnabled && isPrintableCharacterKey(event)) {
                openDropdown();
              }
            }}
            ref={(element) => {
              inputRef.current = element;
              if (typeof ref === 'function') {
                ref(element);
              } else if (ref != null) {
                ref.current = element; // eslint-disable-line no-param-reassign
              }
            }}
            role="combobox"
            tabIndex={resolvedDisabled ? -1 : 0}
          >
            {value.map((selectedValue, index) => (
              <MultiSelectFieldTag
                disabled={resolvedDisabled}
                isFocusable={isDropdownOpen}
                key={selectedValue}
                onCloseDropdown={closeDropdownAndFocusInput}
                onRemoveTag={() => {
                  onChange(value.filter((otherValue) => otherValue !== selectedValue));

                  const tags = tagsRef.current.filter(Boolean);
                  const fallbackTarget = isSearchEnabled ? searchRef.current : inputRef.current;
                  const target = tags[index - 1] ?? tags[index + 1] ?? fallbackTarget;
                  target?.focus();
                }}
                priority={variant}
                ref={(element) => {
                  tagsRef.current[index] = element;
                }}
                size={resolvedSize}
              >
                {optionsLabelMap[selectedValue] ?? selectedValue}
              </MultiSelectFieldTag>
            ))}
            {isSearchEnabled && (
              <MultiSelectFieldSearchInput
                disabled={resolvedDisabled}
                id={id}
                isFocusable={isDropdownOpen}
                onCloseDropdown={closeDropdownAndFocusInput}
                onFocusFirstDropdownItem={() => {
                  optionsRef.current[0]?.focus();
                }}
                onFocusLastDropdownItem={() => {
                  optionsRef.current[optionsRef.current.length - 1]?.focus();
                }}
                onFocusLastTag={() => {
                  const tags = tagsRef.current.filter(Boolean);
                  tags[tags.length - 1]?.focus();
                }}
                onSearchInput={(searchValue) => {
                  setSearch(searchValue);

                  // Typing into the search input while the dropdown is closed reopens it,
                  // e.g. after the dropdown was closed by removing a tag.
                  if (!isDropdownOpen) {
                    setIsDropdownOpen(true);
                  }
                }}
                ref={searchRef}
                searchValue={search}
              />
            )}
          </div>
          <div className={styles.caret}>
            <span className={styles.caretIcon} />
          </div>
          {variant === 'filled' && (
            <div className={styles.bottomLine} />
          )}
        </div>
        {isDropdownOpen && (
          <MultiSelectFieldDropdown
            autoFocusFirstOptionOnOpen={!isSearchEnabled}
            id={id}
            onClose={closeDropdownAndFocusInput}
            onItemSelected={(selectedValue) => {
              if (value.includes(selectedValue)) {
                onChange(value.filter((otherValue) => otherValue !== selectedValue));
              } else {
                onChange([...value, selectedValue]);
              }
            }}
            options={displayedOptions}
            optionsRef={optionsRef}
            value={value}
          />
        )}
        {(helpText && !inputGroupContext) && (
          <div
            className={styles.helpText}
            id={id && `${id}__helpText`}
          >
            {helpText}
          </div>
        )}
        {(validationText && !inputGroupContext) && (
          <div
            className={styles.validationText}
            id={id && `${id}__validationText`}
          >
            {validationText}
          </div>
        )}
      </div>
    </label>
  );
});

MultiSelectField.defaultProps = {
  disabled: false,
  fullWidth: false,
  helpText: undefined,
  id: undefined,
  isLabelVisible: true,
  layout: 'vertical',
  renderAsRequired: false,
  required: false,
  searchAlgorithm: caseInsensitiveAccentSensitivePrefixSearch,
  size: 'medium',
  validationState: undefined,
  validationText: undefined,
  variant: 'outline',
};

MultiSelectField.propTypes = {
  /**
   * If `true`, the input will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the field will span the full width of its parent.
   */
  fullWidth: PropTypes.bool,
  /**
   * Optional help text.
   *
   * Help text is never rendered when the component is placed into `InputGroup`.
   * If a help text is needed, it must be defined on the `InputGroup` component instead.
   */
  helpText: PropTypes.node,
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
  id: PropTypes.string,
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   *
   * Automatically set to `false` when the component is rendered within `InputGroup` component.
   */
  isLabelVisible: PropTypes.bool,
  /**
   * Multi select field label.
   */
  label: PropTypes.node.isRequired,
  /**
   * Layout of the field.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   */
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Callback fired when the selection changes. Called with the new array of selected
   * option values.
   */
  onChange: PropTypes.func.isRequired,
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
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
          disabled: PropTypes.bool,
          key: PropTypes.string,
          label: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
        })),
      }),
    ),
    PropTypes.arrayOf(PropTypes.shape({
      disabled: PropTypes.bool,
      key: PropTypes.string,
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
  ]).isRequired,
  /**
   * If `true`, the input will be rendered as if it was required.
   */
  renderAsRequired: PropTypes.bool,
  /**
   * If `true`, the input will be made and rendered as required, regardless of the `renderAsRequired` prop.
   */
  required: PropTypes.bool,
  /**
   * Search algorithm used to filter the options by the text typed into the search input.
   * The function is called with the `options` array and the search string and returns
   * the options to be displayed.
   *
   * Defaults to the provided `caseInsensitiveAccentSensitivePrefixSearch` algorithm.
   * Set to `null` to disable searching.
   */
  searchAlgorithm: PropTypes.func,
  /**
   * Size of the field.
   *
   * Ignored if the component is rendered within `InputGroup` component as the value is inherited in such case.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Alter the field to provide feedback based on validation result.
   */
  validationState: PropTypes.oneOf(['invalid', 'valid', 'warning']),
  /**
   * Validation message to be displayed.
   *
   * Validation text is never rendered when the component is placed into `InputGroup`. Instead, the `InputGroup`
   * component itself renders all validation texts of its nested components.
   */
  validationText: PropTypes.node,
  /**
   * Array of selected option values.
   */
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  /**
   * Design variant of the field, further customizable with CSS custom properties.
   */
  variant: PropTypes.oneOf(['filled', 'outline']),
};

export const MultiSelectFieldWithGlobalProps = withGlobalProps(MultiSelectField, 'MultiSelectField');

export default MultiSelectFieldWithGlobalProps;
