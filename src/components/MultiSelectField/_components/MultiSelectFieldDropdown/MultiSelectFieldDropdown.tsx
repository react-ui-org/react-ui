import React, {
  useContext,
  useEffect,
  useRef,
} from 'react';
import { TranslationsContext } from '../../../../providers/translations';
import { MultiSelectFieldDropdownGroup } from '../MultiSelectFieldDropdownGroup';
import { MultiSelectFieldDropdownItem } from '../MultiSelectFieldDropdownItem';
import { MultiSelectFieldDropdownTextItem } from '../MultiSelectFieldDropdownTextItem';
import type { MultiSelectFieldOption } from '../../MultiSelectField.types';
import styles from './MultiSelectFieldDropdown.module.scss';
import type { MultiSelectFieldDropdownProps } from './MultiSelectFieldDropdown.types';

const MultiSelectFieldDropdown: React.FunctionComponent<MultiSelectFieldDropdownProps> = ({
  autoFocusFirstOptionOnOpen,
  id,
  onClose,
  onItemSelected,
  options,
  optionsRef,
  value,
}: MultiSelectFieldDropdownProps) => {
  const translations = useContext(TranslationsContext);
  const focusedOptionIndexRef = useRef(-1);

  // Index of each option that can receive focus, i.e. of each displayed option that is not disabled,
  // among all focusable options, in the order of rendering.
  const focusableOptionIndexes = new Map<MultiSelectFieldOption, number>();
  options.forEach((option) => {
    if ('options' in option) {
      option.options.forEach((groupOption) => {
        if (!option.disabled && !groupOption.disabled) {
          focusableOptionIndexes.set(groupOption, focusableOptionIndexes.size);
        }
      });
    } else if (!option.disabled) {
      focusableOptionIndexes.set(option, focusableOptionIndexes.size);
    }
  });
  const focusableOptionsCount = focusableOptionIndexes.size;

  useEffect(() => {
    // Drop refs of options that are no longer displayed, e.g. after the options were filtered.
    optionsRef.current.length = focusableOptionsCount; // eslint-disable-line no-param-reassign
  }, [focusableOptionsCount, optionsRef]);

  useEffect(() => {
    if (autoFocusFirstOptionOnOpen) {
      optionsRef.current[0]?.focus();
    }
  }, [autoFocusFirstOptionOnOpen, optionsRef]);

  const renderOption = (option: MultiSelectFieldOption, isWithinGroup: boolean, isGroupDisabled: boolean) => {
    const isOptionDisabled = isGroupDisabled || option.disabled || false;

    const currentOptionIndex = focusableOptionIndexes.get(option) ?? null;

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

export default MultiSelectFieldDropdown;
