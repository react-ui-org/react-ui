import type {
  CleanedComponentPropsWithChildren,
  Color,
  Size,
} from '../../types';
import type { ModalBodyProps } from './ModalBody.types';
import type { ModalHeaderProps } from './ModalHeader.types';
import type { ModalFooterProps } from './ModalFooter.types';

export type ModalVerticalPosition = 'top' | 'center';
export type ModalSize = Size | 'fullscreen' | 'auto';
export type PreventScrollUnderneathType = ('off' | HTMLElement) | { reset: () => void; start: () => void };

export type ModalProps = CleanedComponentPropsWithChildren<'dialog'> & {
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
  children?: React.JSXElementConstructor<
  ModalBodyProps
  | ModalHeaderProps
  | ModalFooterProps
  >[];
  /**
   * Reference to close button element. It is used to close modal when Escape key is pressed
   * or the backdrop is clicked.
   */
  closeButtonRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Color to clarify importance and meaning of the modal. Implements
   * [Feedback color collection](/docs/foundation/collections#colors).
   */
  color: Color,
  /**
   * Reference to dialog element
   */
  dialogRef?: React.RefObject<HTMLDialogElement | null>;
  /**
   * On dialog cancel handler.
   */
  onCancel?: (e: React.MouseEvent<HTMLDialogElement>) => void;
  /**
   * On dialog close handler.
   */
  onClose?: (e: React.MouseEvent<HTMLDialogElement>) => void;
  /**
   * If set, modal is rendered in the React Portal with that ID.
   */
  portalId?: string;
  /**
   * Vertical position of the modal inside browser window.
   */
  position?: ModalVerticalPosition;
  /**
   * Mode in which Modal prevents scroll of elements bellow:
   * * `off` - Modal does not prevent any scroll
   * * [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) - Modal prevents scroll on this HTML element
   * * object
   *   * `reset` - method called on Modal's unmount to reset scroll prevention
   *   * `start` - method called on Modal's mount to custom scroll prevention
   */
  preventScrollUnderneath?: PreventScrollUnderneathType;
  /**
   * Reference to primary button element. It is used to submit modal when Enter key is pressed and as fallback
   * when `autoFocus` functionality does not find any input element to be focused.
   */
  primaryButtonRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Size of the modal.
   */
  size?: ModalSize;
};

export type PreRenderRestProps = {
  onCancel?: (e: React.MouseEvent<HTMLDialogElement>) => void;
  onClose?: (e: React.MouseEvent<HTMLDialogElement>) => void;
} & Omit<ModalProps,
'size'
| 'primaryButtonRef'
| 'preventScrollUnderneath'
| 'position'
| 'portalId'
| 'dialogRef'
| 'color'
| 'closeButtonRef'
| 'children'
| 'autoFocus'
| 'allowPrimaryActionOnEnterKey'
| 'allowCloseOnEscapeKey'
| 'allowCloseOnBackdropClick'
>;
