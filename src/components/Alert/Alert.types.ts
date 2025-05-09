import type { ReactNode } from 'react';
import type {
  CleanedComponentProps,
  FeedbackColor,
  NeutralColor,
} from '../../types';

export type AlertProps = CleanedComponentProps<'div'> & {
  /**
   * Alert body.
   */
  children: ReactNode;
  /**
   * Color variant to clarify importance and meaning of the alert. Implements
   * [Feedback and Neutral color collections](/docs/foundation/collections#colors).
   */
  color?: FeedbackColor | NeutralColor;
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
