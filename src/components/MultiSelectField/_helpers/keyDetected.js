/**
 * Check if the key press event matches the key binding
 *
 * @param event
 * @param keyBinding
 */
export const keyDetected = (event, keyBinding) => keyBinding.some((binding) => {
  if (typeof binding === 'string') {
    return event.key === binding;
  }

  return Object.keys(binding).every((key) => event[key] === binding[key]);
});
