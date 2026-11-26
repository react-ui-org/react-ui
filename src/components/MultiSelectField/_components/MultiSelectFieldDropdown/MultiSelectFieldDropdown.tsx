import React from 'react';
import type { MouseEvent } from 'react';
import { MultiSelectFieldDropdownGroup } from '../MultiSelectFieldDropdownGroup';
import { MultiSelectFieldDropdownItem } from '../MultiSelectFieldDropdownItem';
import type { MultiSelectFieldOption } from '../../MultiSelectField.types';
import styles from './MultiSelectFieldDropdown.module.scss';
import type { MultiSelectFieldDropdownProps } from './MultiSelectFieldDropdown.types';

/**
 * Listbox of the options, rendered while the dropdown is open. Options of groups are rendered inside
 * `MultiSelectFieldDropdownGroup`.
 */
const MultiSelectFieldDropdown: React.FunctionComponent<MultiSelectFieldDropdownProps> = ({
  activeOptionKey,
  disabled,
  getGroupId,
  getOptionId,
  id,
  labelId,
  onFocusCombobox,
  onItemSelected,
  options,
  value,
}: MultiSelectFieldDropdownProps) => {
  /**
   * Renders a single option. The option is disabled when the field or its group is disabled.
   *
   * @param option Option to render.
   * @param isWithinGroup Whether the option is rendered inside a group.
   * @param isGroupDisabled Whether the group of the option is disabled.
   */
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

  /**
   * Keeps the focus in the combobox on mouse down everywhere except the scroll container itself, which
   * receives the mouse down of its native scrollbar. The focus is restored on mouse up in any case.
   *
   * @param event Mouse down event of the dropdown.
   */
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      event.preventDefault();
    }
  };

  return (
    // The wrapper is not interactive itself, it only keeps the focus in the combobox
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.root}
      onMouseDown={handleMouseDown}
      onMouseUp={onFocusCombobox}
    >
      <div
        aria-labelledby={labelId}
        aria-multiselectable
        className={styles.listbox}
        id={id}
        role="listbox"
      >
        {options.map((option) => {
          if ('options' in option) {
            const groupKey = option.key ?? option.label;

            return option.options.length > 0 && (
              <MultiSelectFieldDropdownGroup
                id={getGroupId(groupKey)}
                key={groupKey}
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
    </div>
  );
};

export default MultiSelectFieldDropdown;
