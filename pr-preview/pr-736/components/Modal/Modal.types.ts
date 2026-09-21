import type {
  ButtonHTMLAttributes,
  DialogHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  Ref,
  RefObject,
} from 'react';
import type {
  FeedbackColor,
  Size,
} from '../../types';

export type ModalJustify = 'start' | 'center' | 'end' | 'space-between' | 'stretch';

export type ModalPosition = 'top' | 'center';

export type ModalScrolling = 'auto' | 'custom' | 'none';

export type ModalScrollPrevention = 'off' | HTMLElement | {
  reset: () => void;
  start: () => void;
};

export type ModalSize = Size | 'fullscreen' | 'auto';

/**
 * Props of the `Modal` component.
 */
export type ModalProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'color'> & {
  /**
   * If `true`, the `Modal` can be closed by clicking on the backdrop.
   */
  allowCloseOnBackdropClick?: boolean;
  /**
   * If `true`, the `Modal` can be closed by pressing the Escape key.
   */
  allowCloseOnEscapeKey?: boolean;
  /**
   * If `true`, the `Modal` can be submitted by pressing the Enter key.
   */
  allowPrimaryActionOnEnterKey?: boolean;
  /**
   * If `true`, focus the first input element in the `Modal`, or primary button (referenced by the `primaryButtonRef`
   * prop), or other focusable element when the `Modal` is opened. If there are none or `autoFocus` is set to `false`,
   * focus the Modal itself.
   */
  autoFocus?: boolean;
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalHeader`
   * * `ModalBody`
   * * `ModalFooter`
   *
   * At least `ModalBody` is required.
   */
  children?: ReactNode;
  /**
   * Reference to close button element. It is used to close modal when Escape key is pressed
   * or the backdrop is clicked.
   */
  closeButtonRef?: RefObject<HTMLButtonElement | null>;
  /**
   * Color to clarify importance and meaning of the modal. Implements
   * [Feedback color collection](/docs/foundation/collections#colors).
   */
  color?: FeedbackColor;
  /**
   * Reference to dialog element
   */
  dialogRef?: Ref<HTMLDialogElement>;
  /**
   * If set, modal is rendered in the React Portal with that ID.
   */
  portalId?: string;
  /**
   * Vertical position of the modal inside browser window.
   */
  position?: ModalPosition;
  /**
   * Mode in which Modal prevents scroll of elements bellow:
   * * `off` - Modal does not prevent any scroll
   * * [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) - Modal prevents scroll on this HTML element
   * * object
   *   * `reset` - method called on Modal's unmount to reset scroll prevention
   *   * `start` - method called on Modal's mount to custom scroll prevention
   */
  preventScrollUnderneath?: ModalScrollPrevention;
  /**
   * Reference to primary button element. It is used to submit modal when Enter key is pressed and as fallback
   * when `autoFocus` functionality does not find any input element to be focused.
   */
  primaryButtonRef?: RefObject<HTMLButtonElement | null>;
  /**
   * Size of the modal.
   */
  size?: ModalSize;
};

export type ModalBodyProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalContent`
   * * `ScrollView` (`scrolling: 'custom'` must be set)
   *
   * You can also provide a custom component responsible for scrolling and displaying content correctly.
   * At most one nested element is allowed. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * Scrolling mode:
   *
   * - `auto`: scrolling is enabled on ModalBody.
   * - `custom`: use if providing a custom scrolling component, e.g. an instance of `ScrollView`.
   * - `none`: scrolling is disabled on ModalBody and the entire Modal is scrollable instead.
   */
  scrolling?: ModalScrolling;
};

export type ModalCloseButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> & {
  /**
   * If `true`, close button will be disabled.
   */
  disabled?: boolean;
};

export type ModalContentProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Content of the modal.
   */
  children?: ReactNode;
};

export type ModalFooterProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Content of the footer (preferably nested `Button` elements).
   */
  children: ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: ModalJustify;
};

export type ModalHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: ModalJustify;
};

export type ModalTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: ReactNode;
  /**
   * Optional heading level. Preferably `1` or `2` should be used, see
   * [W3C recommendation](https://github.com/w3c/aria-practices/issues/551#issuecomment-365134527).
   */
  level?: number;
};

/**
 * Dialog event handlers wired by `Modal`.
 */
export type ModalEvents = Pick<
DialogHTMLAttributes<HTMLDialogElement>,
'onCancel' | 'onClick' | 'onClose' | 'onKeyDown' | 'onMouseDown'
>;

/**
 * Heading element rendered by `ModalTitle` according to its `level`.
 */
export type ModalTitleHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
