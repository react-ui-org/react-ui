import { useEffect } from 'react';

export const useModalFocus = (
  autoFocus,
  childrenWrapperRef,
  primaryButtonRef,
  closeButtonRef,
) => {
  useEffect(
    () => {
      // Following code finds all focusable elements and among them first not disabled form
      // field element (input, textarea or select) or primary button and focuses it. This is
      // necessary to have focus on one of those elements to be able to submit the form
      // by pressing Enter key. If there are neither, it tries to focus any other focusable
      // elements. In case there are none or `autoFocus` is disabled, childrenWrapperElement
      // (Modal itself) is focused.

      const childrenWrapperElement = childrenWrapperRef.current;

      if (childrenWrapperElement == null) {
        return () => {};
      }

      const childrenFocusableElements = Array.from(
        childrenWrapperElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),
      );

      const firstFocusableElement = childrenFocusableElements[0];
      const lastFocusableElement = childrenFocusableElements[childrenFocusableElements.length - 1];

      const resolveFocusBeforeListener = () => {
        if (!autoFocus || childrenFocusableElements.length === 0) {
          childrenWrapperElement.tabIndex = -1;
          childrenWrapperElement.focus();
          return;
        }

        const firstFormFieldEl = childrenFocusableElements.find(
          (element) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName) && !element.disabled,
        );

        if (firstFormFieldEl) {
          firstFormFieldEl.focus();
          return;
        }

        if (primaryButtonRef?.current != null) {
          primaryButtonRef.current.focus();
          return;
        }

        firstFocusableElement.focus();
      };

      const keyPressHandler = (e) => {
        if (e.key === 'Escape' && closeButtonRef?.current != null) {
          closeButtonRef.current.click();
          return;
        }

        if (
          e.key === 'Enter'
          && e.target.nodeName !== 'BUTTON'
          && e.target.nodeName !== 'TEXTAREA'
          && e.target.nodeName !== 'A'
          && primaryButtonRef?.current != null
        ) {
          primaryButtonRef.current.click();
          return;
        }

        // Following code traps focus inside Modal

        if (e.key !== 'Tab') {
          return;
        }

        if (childrenFocusableElements.length === 0) {
          childrenWrapperElement.focus();
          e.preventDefault();
          return;
        }

        if (
          ![
            ...childrenFocusableElements,
            childrenWrapperElement,
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
            || window.document.activeElement === childrenWrapperElement
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
      autoFocus,
      childrenWrapperRef,
      primaryButtonRef,
      closeButtonRef,
    ],
  );
};
