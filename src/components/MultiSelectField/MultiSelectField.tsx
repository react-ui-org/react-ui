import PropTypes from 'prop-types';
import React, {
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { TranslationsContext } from '../../providers/translations';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { useClickOutside } from '../../hooks/useClickOutside';
import { getRootSizeClassName } from '../_helpers/getRootSizeClassName';
import { getRootValidationStateClassName } from '../_helpers/getRootValidationStateClassName';
import { resolveContextOrProp } from '../_helpers/resolveContextOrProp';
import { FormLayoutContext } from '../FormLayout';
import { InputGroupContext } from '../InputGroup';
import { MultiSelectFieldDropdown } from './_components/MultiSelectFieldDropdown';
import { MultiSelectFieldTag } from './_components/MultiSelectFieldTag';
import { flattenOptions } from './_helpers/flattenOptions';
import { getFieldIds } from './_helpers/getFieldIds';
import {
  getNextEnabledIndex,
  getWrappedIndex,
} from './_helpers/getNextEnabledIndex';
import type { IndexMove } from './_helpers/getNextEnabledIndex.types';
import { getOptionsLabelMap } from './_helpers/getOptionsLabelMap';
import { mapKeyToAction } from './_helpers/mapKeyToAction';
import {
  caseInsensitiveAccentSensitivePrefixSearch,
} from './_searchAlgorithms/caseInsensitiveAccentSensitivePrefixSearch';
import styles from './MultiSelectField.module.scss';
import type { MultiSelectFieldProps } from './MultiSelectField.types';

export const MultiSelectField = React.forwardRef<HTMLInputElement, MultiSelectFieldProps>(({
  disabled = false,
  fullWidth = false,
  helpText,
  id,
  isLabelVisible = true,
  label,
  layout = 'vertical',
  onChange,
  options,
  renderAsRequired = false,
  required = false,
  searchAlgorithm = caseInsensitiveAccentSensitivePrefixSearch,
  size = 'medium',
  validationState,
  validationText,
  variant = 'outline',
  value,
  ...restProps
}, ref) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  // Index of the active option within the displayed options, `-1` when no option is active
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  // Index of the tag that is reachable by the Tab key
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);

  const generatedId = useId();
  const ids = getFieldIds(id ?? generatedId);

  const translations = useContext(TranslationsContext);
  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContext = useContext(InputGroupContext);

  const resolvedDisabled = resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled);
  const resolvedSize = resolveContextOrProp(inputGroupContext && inputGroupContext.size, size);

  const optionsLabelMap = useMemo(() => getOptionsLabelMap(options), [options]);

  const isSearchEnabled = searchAlgorithm != null;
  const displayedOptions = (isSearchEnabled && search.length > 0)
    ? searchAlgorithm(options, search)
    : options;
  const flatOptions = flattenOptions(displayedOptions, resolvedDisabled);
  const activeOption = flatOptions[activeOptionIndex] as (typeof flatOptions)[number] | undefined;
  const resolvedActiveTagIndex = Math.max(0, Math.min(activeTagIndex, value.length - 1));

  const getNextActiveOptionIndex = (currentIndex: number, move: IndexMove) => getNextEnabledIndex(
    currentIndex,
    flatOptions.length,
    move,
    (index) => flatOptions[index].disabled,
  );

  const openDropdown = (activeOptionMove?: IndexMove) => {
    setIsDropdownOpen(true);
    setActiveOptionIndex(activeOptionMove ? getNextActiveOptionIndex(-1, activeOptionMove) : -1);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setActiveOptionIndex(-1);
    setSearch('');
  };

  const closeDropdownAndFocusInput = () => {
    closeDropdown();
    inputRef.current?.focus();
  };

  const toggleValue = (optionValue: MultiSelectFieldProps['value'][number]) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((otherValue) => otherValue !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }

    // The search has served its purpose, so it is cleared to let the user search for another option.
    setSearch('');
    setActiveOptionIndex(-1);
  };

  const focusTag = (index: number) => {
    setActiveTagIndex(index);
    tagsRef.current[index]?.focus();
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, otherIndex) => otherIndex !== index));

    // Move focus to the previous tag, or to the next one when the first tag was removed.
    // The next tag takes the index of the removed one.
    if (index > 0) {
      focusTag(index - 1);
    } else if (value.length > 1) {
      tagsRef.current[1]?.focus();
      setActiveTagIndex(0);
    } else {
      inputRef.current?.focus();
    }
  };

  useClickOutside(rootRef, () => {
    if (isDropdownOpen) {
      closeDropdown();
    }
  });

  return (
    <div
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
          styles,
          resolvedSize,
        ),
        getRootValidationStateClassName(styles, validationState),
        variant === 'filled' ? styles.isRootVariantFilled : styles.isRootVariantOutline,
      )}
      id={ids.label}
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
      <label
        className={classNames(
          styles.label,
          (!isLabelVisible || inputGroupContext) && styles.isLabelHidden,
        )}
        htmlFor={ids.input}
        id={ids.labelText}
      >
        {label}
      </label>
      <div className={styles.field}>
        {/* The click toggles the dropdown for pointer users, keyboard users operate the combobox input. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={styles.inputContainer}
          onClick={(event) => {
            // Clicks on the combobox input only open the dropdown, see its own click handler.
            if (resolvedDisabled || event.target === inputRef.current) {
              return;
            }

            if (isDropdownOpen) {
              closeDropdown();
            } else {
              openDropdown();
            }

            inputRef.current?.focus();
          }}
        >
          <div className={styles.input}>
            {value.length > 0 && (
              <div
                aria-labelledby={ids.labelText}
                className={styles.tags}
                role="grid"
              >
                {value.map((selectedValue, index) => (
                  <MultiSelectFieldTag
                    descriptionId={ids.tagDescription}
                    disabled={resolvedDisabled}
                    isActive={index === resolvedActiveTagIndex}
                    key={selectedValue}
                    label={optionsLabelMap[selectedValue] ?? String(selectedValue)}
                    onCloseDropdown={closeDropdownAndFocusInput}
                    onFocus={() => {
                      setActiveTagIndex(index);
                    }}
                    onMove={(move) => {
                      focusTag(getWrappedIndex(index, value.length, move));
                    }}
                    onRemoveTag={() => {
                      removeTag(index);
                    }}
                    priority={variant}
                    ref={(element) => {
                      tagsRef.current[index] = element;
                    }}
                    size={resolvedSize}
                  />
                ))}
              </div>
            )}
            <input
              {...transferProps(restProps)}
              aria-activedescendant={activeOption && ids.item(activeOption.key)}
              aria-autocomplete={isSearchEnabled ? 'list' : undefined}
              aria-controls={isDropdownOpen ? ids.dropdown : undefined}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-labelledby={ids.labelText}
              aria-required={required}
              autoComplete="off"
              className={styles.searchInput}
              disabled={resolvedDisabled}
              id={ids.input}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveOptionIndex(-1);

                // Typing into the input while the dropdown is closed opens it.
                if (!isDropdownOpen) {
                  setIsDropdownOpen(true);
                }
              }}
              onClick={() => {
                if (!isDropdownOpen) {
                  openDropdown();
                }
              }}
              onKeyDown={(event) => {
                const action = mapKeyToAction(event, {
                  canFocusLastTag: search.length === 0 && value.length > 0,
                  hasActiveOption: activeOption != null,
                  isEditable: isSearchEnabled,
                  isOpen: isDropdownOpen,
                });

                if (action == null) {
                  return;
                }

                // The browser still moves the cursor within the search text.
                if (action === 'deactivate') {
                  setActiveOptionIndex(-1);
                  return;
                }

                event.preventDefault();

                switch (action) {
                  case 'open':
                    openDropdown();
                    break;
                  case 'openAndActivateFirst':
                    openDropdown('first');
                    break;
                  case 'openAndActivateLast':
                    openDropdown('last');
                    break;
                  case 'close':
                    closeDropdown();
                    break;
                  case 'activateFirst':
                    setActiveOptionIndex(getNextActiveOptionIndex(-1, 'first'));
                    break;
                  case 'activateLast':
                    setActiveOptionIndex(getNextActiveOptionIndex(-1, 'last'));
                    break;
                  case 'activateNext':
                    setActiveOptionIndex(getNextActiveOptionIndex(activeOptionIndex, 'next'));
                    break;
                  case 'activatePrevious':
                    setActiveOptionIndex(getNextActiveOptionIndex(activeOptionIndex, 'previous'));
                    break;
                  case 'toggleActive':
                    if (activeOption && !activeOption.disabled) {
                      toggleValue(activeOption.value);
                    }
                    break;
                  case 'focusLastTag':
                    focusTag(value.length - 1);
                    break;
                  default:
                    break;
                }
              }}
              readOnly={!isSearchEnabled}
              ref={(element) => {
                inputRef.current = element;
                if (typeof ref === 'function') {
                  ref(element);
                } else if (ref != null) {
                  ref.current = element; // eslint-disable-line no-param-reassign
                }
              }}
              role="combobox"
              type="text"
              value={search}
            />
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
            activeOptionKey={activeOption?.key}
            disabled={resolvedDisabled}
            getOptionId={ids.item}
            id={ids.dropdown}
            labelId={ids.labelText}
            onItemSelected={(selectedValue) => {
              if (!resolvedDisabled) {
                toggleValue(selectedValue);
              }
            }}
            options={displayedOptions}
            value={value}
          />
        )}
        <span
          hidden
          id={ids.tagDescription}
        >
          {translations.MultiSelectField.tagDescription}
        </span>
        {(helpText && !inputGroupContext) && (
          <div
            className={styles.helpText}
            id={ids.helpText}
          >
            {helpText}
          </div>
        )}
        {(validationText && !inputGroupContext) && (
          <div
            className={styles.validationText}
            id={ids.validationText}
          >
            {validationText}
          </div>
        )}
      </div>
    </div>
  );
});

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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
   * ID of the input HTML element. Generated automatically when not set.
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

export const MultiSelectFieldWithGlobalProps = withGlobalProps<MultiSelectFieldProps, HTMLInputElement>(MultiSelectField, 'MultiSelectField');

export default MultiSelectFieldWithGlobalProps;
