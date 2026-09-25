import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
} from 'react';
import { classNames } from '../../../../helpers/classNames';
import styles from './MultiSelectFieldDropdownItem.module.scss';
import type { MultiSelectFieldDropdownItemProps } from './MultiSelectFieldDropdownItem.types';

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

  return (
    // Keyboard selection is handled by the combobox input through `aria-activedescendant`.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
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
      onClick={() => {
        if (disabled) {
          return;
        }

        onSelectDropdownItem();
      }}
      ref={itemRef}
      role="option"
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
MultiSelectFieldDropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isWithinGroup: PropTypes.bool.isRequired,
  onSelectDropdownItem: PropTypes.func.isRequired,
};

export default MultiSelectFieldDropdownItem;
