import { useEffect } from 'react';

export const useModalFocus = (
  allowPrimaryActionOnEnterKey,
  autoFocus,
  dialogRef,
  primaryButtonRef,
) => {
  useEffect(
    () => {
      // Following code finds all focusable elements and among them first not disabled form
      // field element (input, textarea or select) or primary button and focuses it. This is
      // necessary to have focus on one of those elements to be able to submit the form
      // by pressing Enter key. If there are neither, it tries to focus any other focusable
      // elements. In case there are none or `autoFocus` is disabled, dialogElement
      // (Modal itself) is focused.

      const dialogElement = dialogRef.current;

      if (dialogElement == null) {
        return () => {};
      }

      const childrenFocusableElements = Array.from(
        dialogElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      );

      const firstFocusableElement = childrenFocusableElements[0];
      const lastFocusableElement = childrenFocusableElements[childrenFocusableElements.length - 1];

      const resolveFocusBeforeListener = () => {
        if (!autoFocus || childrenFocusableElements.length === 0) {
          dialogElement.tabIndex = -1;
          dialogElement.focus();
          return;
        }

        const firstFormFieldEl = childrenFocusableElements.find(
          (element) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName) && !element.disabled,
        );

        if (firstFormFieldEl) {
          firstFormFieldEl.focus();
          return;
        }

        if (primaryButtonRef?.current != null && primaryButtonRef?.current?.disabled === false) {
          primaryButtonRef.current.focus();
          return;
        }

        firstFocusableElement.focus();
      };

      const keyPressHandler = (e) => {
        if (
          allowPrimaryActionOnEnterKey
          && e.key === 'Enter'
          && e.target.nodeName !== 'BUTTON'
          && e.target.nodeName !== 'TEXTAREA'
          && e.target.nodeName !== 'A'
          && primaryButtonRef?.current != null
          && primaryButtonRef?.current?.disabled === false
        ) {
          primaryButtonRef.current.click();
          return;
        }

        // Following code traps focus inside Modal

        if (e.key !== 'Tab') {
          return;
        }

        if (childrenFocusableElements.length === 0) {
          dialogElement.focus();
          e.preventDefault();
          return;
        }

        if (
          ![
            ...childrenFocusableElements,
            dialogElement,
          ]
            .includes(window.document.activeElement)
        ) {
          firstFocusableElement.focus();
          e.preventDefault();
          return;
        }

        if (!e.shiftKey && window.document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
          return;
        }

        if (e.shiftKey
          && (
            window.document.activeElement === firstFocusableElement
            || window.document.activeElement === dialogElement
          )
        ) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      };

      resolveFocusBeforeListener();

      window.document.addEventListener('keydown', keyPressHandler, false);

      return () => window.document.removeEventListener('keydown', keyPressHandler, false);
    },
    [
      allowPrimaryActionOnEnterKey,
      autoFocus,
      dialogRef,
      primaryButtonRef,
    ],
  );
};
