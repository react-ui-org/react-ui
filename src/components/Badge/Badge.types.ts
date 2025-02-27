import {
  FeedbackColor,
  NeutralColor,
  Priority,
} from '../../types';

export type BadgeProps = React.ComponentProps<'div'> & {
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
  priority?: Exclude<Priority, 'flat'>;
};
