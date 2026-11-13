/**
 * Checks whether the caret of the element is at the start of its text.
 *
 * Elements other than an input have no caret, so they are treated as if the caret was at the start.
 *
 * @param element Element with the caret, e.g. the combobox.
 * @returns Whether the caret is collapsed at the start of the text.
 */
export const isCaretAtStart = (element: HTMLElement | null): boolean => !(element instanceof HTMLInputElement)
  || (element.selectionStart === 0 && element.selectionEnd === 0);
