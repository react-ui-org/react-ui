import React from 'react';

interface ModalProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * If `true`, focus the first input element in the modal
   * or primary button(referenced by the `primaryButtonRef` prop)
   * when the modal is opened.
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
  children?: React.ReactNode;
  /**
   * Reference to close button element.
   * It is used to close modal when Escape key is pressed or the backdrop is clicked.
   */
  closeButtonRef?: React.RefObject<HTMLButtonElement>;
  /**
   * If set, modal is rendered in the React Portal with that ID.
   */
  portalId?: string;
  /**
   * Vertical position of the modal inside browser window.
   */
  position?: VerticalModalPosition;
  /**
   * Reference to primary button element. It is used to submit modal when Enter key is pressed and as fallback
   * when `autoFocus` functionality does not find any input element to be focused.
   */
  primaryButtonRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Size of the modal.
   */
  size?: Size | 'fullscreen' | 'auto';
}

export type ChildrenWrapperRef = React.RefObject<HTMLDivElement>;

export interface PreRenderProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalHeader`
   * * `ModalBody`
   * * `ModalFooter`
   *
   * At least `ModalBody` is required.
   */
  children?: React.ReactNode;
  /**
   * Reference to the wrapper element that wraps the children of the modal.
   * It is used to calculate the height of the modal content for centering
   * the modal vertically inside the browser window.
   */
  childrenWrapperRef: React.RefObject<HTMLDivElement>;
  /**
   * Reference to the close button element. It is used to close the modal
   * when the Escape key is pressed or the backdrop is clicked.
   */
  closeButtonRef?: React.RefObject<HTMLButtonElement>;
  /**
   * Vertical position of the modal inside the browser window.
   */
  position?: VerticalModalPosition;
  /**
   * Size of the modal.
   */
  size?: Size | 'fullscreen' | 'auto';
}

export interface ModalHeaderProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: React.ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: Justify;
}

export interface ModalTitleProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: React.ReactNode;
  /**
   * Optional heading level. Preferably `1` or `2` should be used, see
   * [W3C recommendation](https://github.com/w3c/aria-practices/issues/551#issuecomment-365134527).
   */
  level?: number;
}

export interface ModalFooterProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content of the footer (preferably nested `Button` elements).
   */
  children: React.ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: Justify;
}

export interface ModalBodyProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalContent`
   * * `ScrollView` (`scrolling: 'custom'` must be set)
   *
   * You can also provide a custom component responsible for scrolling and displaying content correctly.
   * At most one nested element is allowed. If none are provided nothing is rendered.
   */
  children?: React.ReactNode;
  /**
   * Scrolling mode:
   *
   * - `auto`: scrolling is enabled on ModalBody.
   * - `custom`: use if providing a custom scrolling component, e.g. an instance of `ScrollView`.
   * - `none`: scrolling is disabled on ModalBody and the entire Modal is scrollable instead.
   */
  scrolling?: Scrolling;
}

export interface ModalCloseButtonProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * If `true`, close button will be disabled.
   */
  disabled?: boolean
}

export interface ModalContentProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content of the modal.
   */
  children?: React.ReactNode;
}

export default ModalProps;
