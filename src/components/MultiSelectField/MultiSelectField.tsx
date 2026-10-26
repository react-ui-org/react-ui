import React, {
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
} from 'react';
import type {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
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
import { MultiSelectFieldDropdownTextItem } from './_components/MultiSelectFieldDropdownTextItem';
import { MultiSelectFieldTags } from './_components/MultiSelectFieldTags';
import { getFieldIds } from './_helpers/getFieldIds';
import { getOptionsLabelMap } from './_helpers/getOptionsLabelMap';
import { useMultiSelectFieldKeyboard } from './_hooks/useMultiSelectFieldKeyboard';
import { useMultiSelectFieldState } from './_hooks/useMultiSelectFieldState';
import {
  caseInsensitiveAccentSensitivePrefixSearch,
} from './_searchAlgorithms/caseInsensitiveAccentSensitivePrefixSearch';
import styles from './MultiSelectField.module.scss';
import type {
  MultiSelectFieldOption,
  MultiSelectFieldProps,
} from './MultiSelectField.types';

/**
 * Field for selecting multiple options. Its combobox follows the ARIA combobox pattern: the search input
 * (or the select-only element without search) keeps the DOM focus, and the active option is referenced by
 * `aria-activedescendant`.
 */
export const MultiSelectField = React.forwardRef<HTMLInputElement | HTMLDivElement, MultiSelectFieldProps>(({
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
  const comboboxRef = useRef<HTMLInputElement | HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const generatedId = useId();
  const ids = useMemo(() => getFieldIds(id ?? generatedId), [id, generatedId]);

  const translations = useContext(TranslationsContext);
  const formLayoutContext = useContext(FormLayoutContext);
  const inputGroupContext = useContext(InputGroupContext);

  const resolvedDisabled = resolveContextOrProp(inputGroupContext && inputGroupContext.disabled, disabled);
  const resolvedSize = resolveContextOrProp(inputGroupContext && inputGroupContext.size, size);

  const optionsLabelMap = useMemo(() => getOptionsLabelMap(options), [options]);

  const state = useMultiSelectFieldState({
    isDisabled: resolvedDisabled,
    onChange,
    options,
    searchAlgorithm,
    value,
  });
  const {
    activeOption,
    changeSearch,
    closeDropdown,
    displayedOptions,
    flatOptions,
    isDropdownOpen,
    isSearchEnabled,
    openDropdown,
    search,
    toggleValue,
  } = state;
  const keyboard = useMultiSelectFieldKeyboard({
    comboboxRef,
    isDisabled: resolvedDisabled,
    state,
    value,
  });
  const {
    focusCombobox,
    handleTagKeyAction,
    registerTag,
    removeTag,
  } = keyboard;

  const isNoOptionsShown = isDropdownOpen && flatOptions.length === 0;

  // Help and validation texts describe the combobox, an `aria-describedby` passed by the consumer is kept.
  const describedBy = [
    (helpText && !inputGroupContext) ? ids.helpText : undefined,
    (validationText && !inputGroupContext) ? ids.validationText : undefined,
    restProps['aria-describedby'],
  ].filter(Boolean).join(' ');

  /**
   * Keeps the element of the combobox and forwards it to the ref of the field. The callback is stable, so a
   * callback ref passed by the consumer is not called again on every render.
   *
   * @param element Rendered combobox element, `null` when it is unmounted.
   */
  const setComboboxRef = useCallback((element: HTMLInputElement | HTMLDivElement | null) => {
    comboboxRef.current = element;
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref != null) {
      ref.current = element; // eslint-disable-line no-param-reassign
    }
  }, [ref]);

  /**
   * Opens the dropdown on click. The select-only combobox also closes it, like a native select does.
   * A click handler passed by the consumer is called first and can prevent the default to stop this.
   *
   * @param event Click event of the combobox.
   */
  const handleComboboxClick = (event: MouseEvent<HTMLInputElement | HTMLDivElement>) => {
    // The consumer handler is typed for the input, the select-only element receives the same event.
    restProps.onClick?.(event as MouseEvent<HTMLInputElement>);

    if (resolvedDisabled || event.defaultPrevented) {
      return;
    }

    if (!isDropdownOpen) {
      openDropdown();
    } else if (!isSearchEnabled) {
      closeDropdown();
    }
  };

  /**
   * Handles a key press on the combobox. A key down handler passed by the consumer is called first and can
   * prevent the default to stop the field from handling the key.
   *
   * @param event Keyboard event of the combobox.
   */
  const handleComboboxKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
    restProps.onKeyDown?.(event as KeyboardEvent<HTMLInputElement>);

    if (!event.defaultPrevented) {
      keyboard.handleComboboxKeyDown(event);
    }
  };

  /**
   * Closes the dropdown when the focus moves out of the field. When `relatedTarget` is `null` (focus lost by
   * clicking a non-focusable element), closing is left to the click-outside handler so that clicks inside the
   * field do not close the dropdown.
   *
   * @param event Blur event of the field.
   */
  const handleRootBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (
      isDropdownOpen
      && event.relatedTarget !== null
      && rootRef.current
      && !rootRef.current.contains(event.relatedTarget)
    ) {
      closeDropdown();
    }
  };

  /**
   * Focuses the select-only combobox and opens the dropdown on clicking the label. The label of the search input
   * is associated with it by `htmlFor` instead, so the browser handles the click.
   */
  const handleLabelClick = () => {
    focusCombobox();

    if (!isDropdownOpen && !resolvedDisabled) {
      openDropdown();
    }
  };

  /**
   * Toggles the dropdown on clicking the field around the combobox, e.g. its caret, and focuses the combobox.
   * Clicks on the combobox itself are handled by its own click handler.
   *
   * @param event Click event of the field.
   */
  const handleInputContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    if (resolvedDisabled || event.target === comboboxRef.current) {
      return;
    }

    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }

    focusCombobox();
  };

  /**
   * Updates the search text on typing into the search input.
   *
   * @param event Change event of the search input.
   */
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeSearch(event.target.value);
  };

  /**
   * Toggles the option selected by a click in the dropdown and keeps the focus in the combobox.
   *
   * @param selectedValue Value of the clicked option.
   */
  const handleItemSelected = (selectedValue: MultiSelectFieldOption['value']) => {
    if (resolvedDisabled) {
      return;
    }

    toggleValue(selectedValue);
    focusCombobox();
  };

  // Props shared by the editable combobox input and the non-editable combobox element
  const comboboxProps = {
    'aria-activedescendant': (isDropdownOpen && activeOption) ? ids.item(activeOption.key) : undefined,
    'aria-controls': (isDropdownOpen && flatOptions.length > 0) ? ids.dropdown : undefined,
    'aria-describedby': describedBy || undefined,
    // The dropdown is only expanded while it has options to show, see the status region for the "no options" text.
    'aria-expanded': isDropdownOpen && flatOptions.length > 0,
    'aria-haspopup': 'listbox' as const,
    'aria-invalid': validationState === 'invalid' ? true : restProps['aria-invalid'],
    'aria-labelledby': ids.labelText,
    'aria-required': required,
    className: styles.combobox,
    id: ids.input,
    onClick: handleComboboxClick,
    onKeyDown: handleComboboxKeyDown,
    ref: setComboboxRef,
    role: 'combobox',
  };

  // Stable callback, so the document listener is not reattached on every render.
  const closeOnClickOutside = useCallback(() => {
    if (isDropdownOpen) {
      closeDropdown();
    }
  }, [closeDropdown, isDropdownOpen]);

  useClickOutside(rootRef, closeOnClickOutside);

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
      onBlur={handleRootBlur}
      ref={rootRef}
    >
      {/* Keyboard users reach the combobox by Tab, the click only helps pointer users. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <label
        className={classNames(
          styles.label,
          (!isLabelVisible || inputGroupContext) && styles.isLabelHidden,
        )}
        // A label can only be associated with the input, the non-editable combobox is focused on click instead.
        htmlFor={isSearchEnabled ? ids.input : undefined}
        id={ids.labelText}
        onClick={isSearchEnabled ? undefined : handleLabelClick}
      >
        {label}
      </label>
      <div className={styles.field}>
        {/* The click toggles the dropdown for pointer users, keyboard users operate the combobox. */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={styles.inputContainer}
          onClick={handleInputContainerClick}
        >
          <div className={styles.input}>
            <MultiSelectFieldTags
              descriptionId={ids.tagDescription}
              disabled={resolvedDisabled}
              labelId={ids.labelText}
              onFocusTag={closeDropdown}
              onKeyAction={handleTagKeyAction}
              onRemoveTag={removeTag}
              priority={variant}
              registerTag={registerTag}
              size={resolvedSize}
              tags={value.map((selectedValue) => ({
                label: optionsLabelMap[selectedValue] ?? String(selectedValue),
                value: selectedValue,
              }))}
            />
            {isSearchEnabled ? (
              <input
                {...transferProps(restProps)}
                {...comboboxProps}
                aria-autocomplete="list"
                autoComplete="off"
                disabled={resolvedDisabled}
                onChange={handleSearchChange}
                type="text"
                value={search}
              />
            ) : (
              // Without search, the combobox is not editable, so it is not rendered as an input which screen readers
              // would announce as read-only. Disabled, it is not focusable at all.
              <div
                {...transferProps(restProps)}
                {...comboboxProps}
                aria-disabled={resolvedDisabled || undefined}
                tabIndex={resolvedDisabled ? undefined : 0}
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
        {(isDropdownOpen && flatOptions.length > 0) && (
          <MultiSelectFieldDropdown
            activeOptionKey={activeOption?.key}
            disabled={resolvedDisabled}
            getGroupId={ids.group}
            getOptionId={ids.item}
            id={ids.dropdown}
            labelId={ids.labelText}
            onFocusCombobox={focusCombobox}
            onItemSelected={handleItemSelected}
            options={displayedOptions}
            value={value}
          />
        )}
        {/* The region is always rendered so that screen readers announce the text reliably once it appears. */}
        <div
          aria-live="polite"
          className={classNames(
            styles.status,
            isNoOptionsShown && styles.isStatusShown,
          )}
          role="status"
        >
          {isNoOptionsShown && (
            <MultiSelectFieldDropdownTextItem>
              {translations.MultiSelectField.noOptions}
            </MultiSelectFieldDropdownTextItem>
          )}
        </div>
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

export const MultiSelectFieldWithGlobalProps = withGlobalProps<MultiSelectFieldProps, HTMLInputElement | HTMLDivElement>(MultiSelectField, 'MultiSelectField');

export default MultiSelectFieldWithGlobalProps;
