import type { HTMLAttributes } from 'react';
import type {
  FeedbackColor,
  NeutralColor,
  Priority,
} from '../../types';

export type BadgePriority = Exclude<Priority, 'flat'>;

export type BadgeProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  /**
   * Color to clarify importance and meaning of the badge. Implements
   * [Feedback and Neutral color collections](/docs/foundation/collections#colors).
   */
  color?: FeedbackColor | NeutralColor;
  /**
   * Text to be displayed.
   */
  label: string;
  /**
   * Visual priority to highlight or suppress the badge.
   */
  priority?: BadgePriority;
};
