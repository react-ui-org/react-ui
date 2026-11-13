import React from 'react';
import { MultiSelectFieldTag } from '../MultiSelectFieldTag';
import styles from './MultiSelectFieldTags.module.scss';
import type { MultiSelectFieldTagsProps } from './MultiSelectFieldTags.types';

/**
 * Row of selected values. The tags form a single-row grid, the keys move between them.
 * Renders nothing when there are no tags.
 */
const MultiSelectFieldTags: React.FunctionComponent<MultiSelectFieldTagsProps> = ({
  descriptionId,
  disabled,
  labelId,
  onFocusTag,
  onKeyAction,
  onRemoveTag,
  priority,
  registerTag,
  size,
  tags,
}: MultiSelectFieldTagsProps) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div
      aria-labelledby={labelId}
      className={styles.root}
      role="grid"
    >
      <div
        className={styles.row}
        role="row"
      >
        {tags.map((tag, index) => (
          <MultiSelectFieldTag
            descriptionId={descriptionId}
            disabled={disabled}
            key={tag.value}
            label={tag.label}
            onFocus={onFocusTag}
            onKeyAction={(action, event) => {
              onKeyAction(action, event, index);
            }}
            onRemoveTag={() => {
              onRemoveTag(index);
            }}
            priority={priority}
            ref={(element) => {
              registerTag(index, element);
            }}
            size={size}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiSelectFieldTags;
