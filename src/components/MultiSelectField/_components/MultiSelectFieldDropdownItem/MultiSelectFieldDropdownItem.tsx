import React, {
  useEffect,
  useRef,
} from 'react';
import { classNames } from '../../../../helpers/classNames';
import styles from './MultiSelectFieldDropdownItem.module.scss';
import type { MultiSelectFieldDropdownItemProps } from './MultiSelectFieldDropdownItem.types';

/**
 * Single option of the dropdown. It is not focusable, the active option is announced through
 * `aria-activedescendant` of the combobox.
 */
const MultiSelectFieldDropdownItem: React.FunctionComponent<MultiSelectFieldDropdownItemProps> = ({
  children,
  disabled,
  id,
  isActive,
  isSelected,
  isWithinGroup,
  onSelectDropdownItem,
}: MultiSelectFieldDropdownItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The active option does not receive DOM focus, so it must be scrolled into view manually.
    if (isActive) {
      itemRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isActive]);

  /** Reports the click to the parent, clicks on a disabled option are ignored. */
  const handleClick = () => {
    if (disabled) {
      return;
    }

    onSelectDropdownItem();
  };

  return (
    // Options are not focusable, the combobox references the active one by `aria-activedescendant`.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus
    <div
      aria-disabled={disabled}
      aria-selected={isSelected}
      className={classNames(
        styles.root,
        disabled && styles.isRootDisabled,
        isActive && styles.isRootActive,
        isSelected && styles.isRootSelected,
        isWithinGroup && styles.isRootInGroup,
      )}
      id={id}
      onClick={handleClick}
      ref={itemRef}
      role="option"
    >
      {children}
    </div>
  );
};

export default MultiSelectFieldDropdownItem;
