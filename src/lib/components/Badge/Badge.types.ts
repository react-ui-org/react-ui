export interface BadgeProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * [Color variant](/foundation/colors#component-colors) to clarify importance and meaning of the badge.
   */
  color?: Color;
  /**
   * Text to be displayed.
   */
  label: string;
  /**
   * Visual priority to highlight or suppress the badge.
   */
  priority?: Exclude<Priority, 'flat'>;
}
