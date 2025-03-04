import {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import {
  Breakpoint,
  Color,
  Priority,
  Size,
} from '../../types';

export type ButtonProps = React.ComponentProps<'button'> & {
  /**
   * Element to be displayed after label, eg. an icon.
   */
  afterLabel?: ReactNode;
  /**
   * Element to be displayed before label, eg. an icon.
   */
  beforeLabel?: ReactNode;
  /**
   * If `true`, the button will span the full width of its parent.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  block?: boolean;
  /**
   * Color variant to clarify importance and meaning of the alert. Implements
   * [Action, Feedback and Neutral color collections](/docs/foundation/collections#colors).
   */
  color?: Color;
  /**
   * If `true`, the button will be disabled.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  disabled?: boolean;
  /**
   * Element to be displayed in the top right corner.
   */
  endCorner?: ReactNode;
  /**
   * Element to be displayed as a feedback icon on top of button label. When defined, it implies the
   * button is in feedback state.
   */
  feedbackIcon?: ReactNode;
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__labelText`
   */
  id?: string;
  /**
   * Button label.
   */
  label: string;
  /**
   * Defines minimum breakpoint from which the button label will be visible.
   */
  labelVisibility?: Breakpoint;
  /**
   * Visual priority to highlight or suppress the button.
   *
   * Ignored if the component is rendered within `ButtonGroup` component
   * as the value is inherited in such case.
   */
  priority?: Priority;
  /**
   * Size of the button.
   *
   * Ignored if the component is rendered within `ButtonGroup` or `InputGroup` component as the value is inherited in
   * such case.
   */
  size?: Size;
  /**
   * Element to be displayed in the top left corner.
   */
  startCorner?: ReactNode;
  /**
   * Set the HTML `type` attribute of the `button` element.
   */
  type?: Exclude<ButtonHTMLAttributes<HTMLButtonElement>['type'], 'reset'>;
};
