import type {
  CleanedComponentPropsWithChildren,
  FeedbackColor,
  NeutralColor,
} from '../../types';
import type { ScrollViewProps } from '../ScrollView/ScrollView.types';
import type { CardBodyProps } from './CardBody.types';
import type { CardFooterProps } from './CardFooter.types';

export type CardProps = CleanedComponentPropsWithChildren<'div'> & {
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
