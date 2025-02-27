import { ReactNode } from 'react';
import {
  AutoScroll,
  Layout,
} from '../../types';

export type ScrollViewProps = React.ComponentProps<'div'> & {
  /**
   * If `true`, display the arrow controls.
   */
  arrows?: boolean;
  /**
   * Portion to scroll by when the arrows are clicked, in px.
   */
  arrowsScrollStep?: number;
  /**
   * The auto-scroll mechanism requires having the `key` prop set for every child present in `children`
   * because it detects changes of those keys. Without the keys, the auto-scroll will not work.
   *
   * Option `always` means the auto-scroll scrolls to the end every time the content changes.
   * Option `detectEnd` means the auto-scroll scrolls to the end only when the content is changed
   * and the user has scrolled at the end of the viewport at the moment of the change.
   *
   * See https://reactjs.org/docs/lists-and-keys.html#keys
   */
  autoScroll?: AutoScroll;
  /**
   * Content to be scrollable.
   */
  children?: ReactNode;
  /**
   * Delay in ms before the display of arrows and scrolling shadows is evaluated during interaction.
   */
  debounce?: number;
  /**
   * Direction of scrolling.
   */
  direction?: Layout;
  /**
   * Custom background of the end scrolling shadow. Can be a CSS gradient or an image `url()`.
   */
  endShadowBackground?: string;
  /**
   * Initial offset of the end scrolling shadow (transitioned). If set, the end scrolling shadow slides in
   * by this distance.
   */
  endShadowInitialOffset?: string;
  /**
   * Size of the end scrolling shadow. Accepts any valid CSS length value.
   */
  endShadowSize?: string;
  /**
   * ID of the root HTML element. It also serves as base for nested elements:
   * * `<ID>__content`
   * * `<ID>__arrowPrevButton`
   * * `<ID>__arrowNextButton`
   */
  id?: string;
  /**
   * Text color of the end arrow control. Accepts any valid CSS color value.
   */
  nextArrowColor?: string;
  /**
   * Custom HTML or React Component to replace the default next-arrow control.
   */
  nextArrowElement?: ReactNode;
  /**
   * Initial offset of the end arrow control (transitioned). If set, the next arrow slides in by this distance.
   */
  nextArrowInitialOffset?: string;
  /**
   * Text color of the start arrow control. Accepts any valid CSS color value.
   */
  prevArrowColor?: string;
  /**
   * Custom HTML or React Component to replace the default prev-arrow control.
   */
  prevArrowElement?: ReactNode;
  /**
   * Initial offset of the start arrow control (transitioned). If set, the prev arrow slides in by this distance.
   */
  prevArrowInitialOffset?: string;
  /**
   * If `false`, the system scrollbar will be hidden.
   */
  scrollbar?: boolean;
  /**
   * If `true`, display scrolling shadows.
   */
  shadows?: boolean;
  /**
   * Custom background of the start scrolling shadow. Can be a CSS gradient or an image `url()`.
   */
  startShadowBackground?: string;
  /**
   * Initial offset of the start scrolling shadow (transitioned). If set, the start scrolling shadow slides in
   * by this distance.
   */
  startShadowInitialOffset?: string;
  /**
   * Size of the start scrolling shadow. Accepts any valid CSS length value.
   */
  startShadowSize?: string;
};

export type PositionDifference = {
  bottom: number,
  left: number,
  right: number,
  top: number,
};
