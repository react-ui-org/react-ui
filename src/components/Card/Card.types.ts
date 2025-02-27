import {
  FeedbackColor,
  NeutralColor,
} from '../../types';
import { ScrollViewProps } from '../ScrollView/ScrollView.types';
import { CardBodyProps } from './CardBody.types';
import { CardFooterProps } from './CardFooter.types';

export type CardProps = React.ComponentProps<'div'> & {
  /**
   * Slot for individual card elements that build up the inner layout:
   * * `CardBody`
   * * `CardFooter`
   * * `ScrollView`
   */
  children: React.JSXElementConstructor<
  CardBodyProps
  | CardFooterProps
  | ScrollViewProps
  >[];
  /**
   * Color to clarify importance and meaning of the card. Implements
   * [Feedback and Neutral color collections](/docs/foundation/collections#colors).
   */
  color?: FeedbackColor | NeutralColor;
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
