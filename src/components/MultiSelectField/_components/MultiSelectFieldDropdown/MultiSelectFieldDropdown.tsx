import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { TranslationsContext } from '../../../../providers/translations';
import { MultiSelectFieldDropdownGroup } from '../MultiSelectFieldDropdownGroup';
import { MultiSelectFieldDropdownItem } from '../MultiSelectFieldDropdownItem';
import { MultiSelectFieldDropdownTextItem } from '../MultiSelectFieldDropdownTextItem';
import type { MultiSelectFieldOption } from '../../MultiSelectField.types';
import styles from './MultiSelectFieldDropdown.module.scss';
import type { MultiSelectFieldDropdownProps } from './MultiSelectFieldDropdown.types';

const MultiSelectFieldDropdown: React.FunctionComponent<MultiSelectFieldDropdownProps> = ({
  activeOptionKey,
  disabled,
  getOptionId,
  id,
  labelId,
  onItemSelected,
  options,
  value,
}: MultiSelectFieldDropdownProps) => {
  const translations = useContext(TranslationsContext);

  const renderOption = (option: MultiSelectFieldOption, isWithinGroup: boolean, isGroupDisabled: boolean) => {
    const optionKey = option.key ?? option.value;
    const isOptionDisabled = disabled || isGroupDisabled || (option.disabled ?? false);

    return (
      <MultiSelectFieldDropdownItem
        disabled={isOptionDisabled}
        id={getOptionId(optionKey)}
        isActive={optionKey === activeOptionKey}
        isSelected={value.includes(option.value)}
        isWithinGroup={isWithinGroup}
        key={optionKey}
        onSelectDropdownItem={() => {
          onItemSelected(option.value);
        }}
      >
        {option.label}
      </MultiSelectFieldDropdownItem>
    );
  };

  return (
    // The handler only keeps the focus in the combobox input, which handles the keyboard.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.root}
      onMouseDown={(event) => {
        // Keep the focus in the combobox input when options are clicked.
        event.preventDefault();
      }}
    >
      <div
        aria-labelledby={labelId}
        aria-multiselectable
        id={id}
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
                  (groupOption) => renderOption(groupOption, true, option.disabled ?? false),
                )}
              </MultiSelectFieldDropdownGroup>
            );
          }

          return renderOption(option, false, false);
        })}
      </div>
      {/* A listbox may only contain options and groups, so the text is placed next to it. The live region
          is always rendered so that screen readers announce the text reliably once it appears. */}
      <div
        aria-live="polite"
        role="status"
      >
        {options.length === 0 && (
          <MultiSelectFieldDropdownTextItem>
            {translations.MultiSelectField.noOptions}
          </MultiSelectFieldDropdownTextItem>
        )}
      </div>
    </div>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
MultiSelectFieldDropdown.propTypes = {
  activeOptionKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool.isRequired,
  getOptionId: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
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
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default MultiSelectFieldDropdown;
