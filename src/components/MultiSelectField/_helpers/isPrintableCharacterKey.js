/**
 * Check if the key press event represents typing of a single printable character
 *
 * @param event
 * @returns {boolean}
 */
export const isPrintableCharacterKey = (event) => (
  event.key.length === 1
  && !event.altKey
  && !event.ctrlKey
  && !event.metaKey
);
