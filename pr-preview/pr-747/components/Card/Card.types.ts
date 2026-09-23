import type {
  HTMLAttributes,
  ReactNode,
} from 'react';
import type { FeedbackColor } from '../../types';

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  /**
   * Slot for individual card elements that build up the inner layout:
   * * `CardBody`
   * * `CardFooter`
   * * `ScrollView`
   */
  children: ReactNode;
  /**
   * Color to clarify importance and meaning of the card. Implements
   * [Feedback color collection](/docs/foundation/collections#colors).
   */
  color?: FeedbackColor;
  /**
   * Make the card more compact.
   */
  dense?: boolean;
  /**
   * If `true`, the card will be disabled.
   */
  disabled?: boolean;
  /**
   * Add shadow to pull the card above surface.
   */
  raised?: boolean;
};

export type CardBodyProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Content of the card.
   */
  children: ReactNode;
};

export type CardFooterProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Card actions, usually buttons.
   */
  children?: ReactNode;
};
