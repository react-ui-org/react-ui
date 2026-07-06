import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useRef,
} from 'react';
import { TranslationsContext } from '../../../../providers/translations';
import { MultiSelectFieldDropdownGroup } from '../MultiSelectFieldDropdownGroup';
import { MultiSelectFieldDropdownItem } from '../MultiSelectFieldDropdownItem';
import { MultiSelectFieldDropdownTextItem } from '../MultiSelectFieldDropdownTextItem';
import styles from './MultiSelectFieldDropdown.module.scss';

const MultiSelectFieldDropdown = ({
  autoFocusFirstOptionOnOpen,
  id,
  onClose,
  onItemSelected,
  options,
  optionsRef,
  value,
}) => {
  const translations = useContext(TranslationsContext);
  const focusedOptionIndexRef = useRef(-1);

  // Number of options that can receive focus, i.e. all displayed options that are not disabled.
  const focusableOptionsCount = options.reduce(
    (count, option) => ('options' in option
      ? count + option.options.filter((groupOption) => !option.disabled && !groupOption.disabled).length
      : count + (option.disabled ? 0 : 1)),
    0,
  );

  useEffect(() => {
    // Drop refs of options that are no longer displayed, e.g. after the options were filtered.
    optionsRef.current.length = focusableOptionsCount; // eslint-disable-line no-param-reassign
  }, [focusableOptionsCount, optionsRef]);

  useEffect(() => {
    if (autoFocusFirstOptionOnOpen) {
      optionsRef.current[0]?.focus();
    }
  }, [autoFocusFirstOptionOnOpen, optionsRef]);

  // Index of an option among all focusable options, assigned in the order of rendering.
  let optionIndex = 0;

  const renderOption = (option, isWithinGroup, isGroupDisabled) => {
    const isOptionDisabled = isGroupDisabled || option.disabled || false;

    let currentOptionIndex = null;
    if (!isOptionDisabled) {
      currentOptionIndex = optionIndex;
      optionIndex += 1;
    }

    return (
      <MultiSelectFieldDropdownItem
        disabled={isOptionDisabled}
        id={id && `${id}__item__${option.key ?? option.value}`}
        isSelected={value.includes(option.value)}
        isWithinGroup={isWithinGroup}
        key={option.key ?? option.value}
        onCloseDropdown={onClose}
        onFocus={() => {
          if (currentOptionIndex != null) {
            focusedOptionIndexRef.current = currentOptionIndex;
          }
        }}
        onFocusNextDropdownItem={() => {
          if (focusedOptionIndexRef.current < optionsRef.current.length - 1) {
            focusedOptionIndexRef.current += 1;
          }

          optionsRef.current[focusedOptionIndexRef.current]?.focus();
        }}
        onFocusPreviousDropdownItem={() => {
          if (focusedOptionIndexRef.current > 0) {
            focusedOptionIndexRef.current -= 1;
          }

          optionsRef.current[focusedOptionIndexRef.current]?.focus();
        }}
        onSelectDropdownItem={() => {
          onItemSelected(option.value);
        }}
        ref={(element) => {
          if (element != null && currentOptionIndex != null) {
            optionsRef.current[currentOptionIndex] = element; // eslint-disable-line no-param-reassign
          }
        }}
      >
        {option.label}
      </MultiSelectFieldDropdownItem>
    );
  };

  return (
    <div
      aria-multiselectable
      className={styles.root}
      id={id && `${id}__dropdown`}
      role="listbox"
      tabIndex={-1}
    >
      {options.map((option) => {
        if ('options' in option) {
          return option.options.length > 0 && (
            <MultiSelectFieldDropdownGroup
              key={option.key ?? option.label}
              label={option.label}
            >
              {option.options.map(
                (groupOption) => renderOption(groupOption, true, option.disabled || false),
              )}
            </MultiSelectFieldDropdownGroup>
          );
        }

        return renderOption(option, false, false);
      })}
      {options.length === 0 && (
        <MultiSelectFieldDropdownTextItem>
          {translations.MultiSelectField.noOptions}
        </MultiSelectFieldDropdownTextItem>
      )}
    </div>
  );
};

MultiSelectFieldDropdown.defaultProps = {
  id: undefined,
};

MultiSelectFieldDropdown.propTypes = {
  autoFocusFirstOptionOnOpen: PropTypes.bool.isRequired,
  id: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
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
  optionsRef: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    current: PropTypes.array.isRequired,
  }).isRequired,
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default MultiSelectFieldDropdown;
