import PropTypes from 'prop-types';
import React, {
  useContext,
  useState,
} from 'react';
import { TranslationsContext } from '../../../../providers/translations';
import { classNames } from '../../../../helpers/classNames';
import { getRootPriorityClassName } from '../../../_helpers/getRootPriorityClassName';
import { getRootSizeClassName } from '../../../_helpers/getRootSizeClassName';
import { keyDetected } from '../../_helpers/keyDetected';
import keyBindings from '../../keyBindings';
import styles from './MultiSelectFieldTag.module.scss';
import type { MultiSelectFieldTagProps } from './MultiSelectFieldTag.types';

const MultiSelectFieldTag = React.forwardRef<HTMLDivElement, MultiSelectFieldTagProps>((
  {
    descriptionId,
    disabled,
    isActive,
    label,
    onCloseDropdown,
    onFocus,
    onMove,
    onRemoveTag,
    priority,
    size,
  },
  ref,
) => {
  const translations = useContext(TranslationsContext);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);

  return (
    <div
      aria-describedby={disabled ? undefined : descriptionId}
      aria-disabled={disabled}
      aria-label={label}
      className={classNames(
        styles.root,
        disabled && styles.isRootDisabled,
        getRootPriorityClassName(styles, priority),
        getRootSizeClassName(styles, size),
      )}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHasFocusWithin(false);
        }
      }}
      onClick={(event) => {
        // Do not let the click toggle the dropdown.
        event.stopPropagation();
      }}
      onFocus={() => {
        setHasFocusWithin(true);
        onFocus();
      }}
      onKeyDown={(event) => {
        if (disabled) {
          return;
        }

        if (keyDetected(event, keyBindings.closeDropdown)) {
          event.preventDefault();
          onCloseDropdown();
        } else if (keyDetected(event, keyBindings.removeTag)) {
          event.preventDefault();
          onRemoveTag();
        } else if (keyDetected(event, keyBindings.focusNextTag)) {
          event.preventDefault();
          onMove('next');
        } else if (keyDetected(event, keyBindings.focusPreviousTag)) {
          event.preventDefault();
          onMove('previous');
        } else if (keyDetected(event, keyBindings.focusFirstTag)) {
          event.preventDefault();
          onMove('first');
        } else if (keyDetected(event, keyBindings.focusLastTag)) {
          event.preventDefault();
          onMove('last');
        }
      }}
      ref={ref}
      role="row"
      tabIndex={(isActive && !disabled) ? 0 : -1}
    >
      <div
        className={styles.cell}
        role="gridcell"
      >
        <span>
          {label}
        </span>
        {!disabled && (
          <button
            aria-label={`${translations.MultiSelectField.removeTag} ${label}`}
            className={styles.removeButton}
            onClick={onRemoveTag}
            // The remove button is reachable by Tab only while its tag has focus.
            tabIndex={hasFocusWithin ? 0 : -1}
            type="button"
          >
            <span aria-hidden>
              ×
            </span>
          </button>
        )}
      </div>
    </div>
  );
});

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
MultiSelectFieldTag.propTypes = {
  descriptionId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onCloseDropdown: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  priority: PropTypes.oneOf(['filled', 'outline']).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
};

export default MultiSelectFieldTag;
