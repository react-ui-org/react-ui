import type {
  HTMLAttributes,
  ReactNode,
} from 'react';
import type { FeedbackColor } from '../../types';

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  /**
   * Alert body.
   */
  children: ReactNode;
  /**
   * Color variant to clarify importance and meaning of the alert. Implements
   * [Feedback color collection](/docs/foundation/collections#colors).
   */
  color?: FeedbackColor;
  /**
   * Optional element to be displayed next to the alert body.
   */
  icon?: ReactNode;
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__close`
   * * `<ID>__content`
   */
  id?: string;
  /**
   * Function to call when the close button is clicked. If not provided, close buttons will be
   * hidden.
   */
  onClose?: () => void;
};
