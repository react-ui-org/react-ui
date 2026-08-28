import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useModalFocus = (
  autoFocus: boolean,
  dialogRef: RefObject<HTMLDialogElement | null>,
  primaryButtonRef: RefObject<HTMLButtonElement | null> | undefined,
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
        dialogElement.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );

      const firstFocusableElement = childrenFocusableElements[0];

      if (!autoFocus || childrenFocusableElements.length === 0) {
        dialogElement.tabIndex = -1;
        dialogElement.focus();
        return () => {};
      }

      const firstFormFieldEl = childrenFocusableElements.find(
        (element) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName)
          && !(element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).disabled,
      );

      if (firstFormFieldEl) {
        firstFormFieldEl.focus();
        return () => {};
      }

      if (primaryButtonRef?.current != null && primaryButtonRef?.current?.disabled === false) {
        primaryButtonRef.current.focus();
        return () => {};
      }

      firstFocusableElement.focus();

      return () => {};
    },
    [
      autoFocus,
      dialogRef,
      primaryButtonRef,
    ],
  );
};
