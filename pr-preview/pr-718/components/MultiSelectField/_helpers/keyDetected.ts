import type {
  KeyBinding,
  KeyDetectedEvent,
} from './keyDetected.types';

/**
 * Check if the key press event matches the key binding
 */
export const keyDetected = (event: KeyDetectedEvent, keyBinding: KeyBinding) => keyBinding.some((binding) => {
  if (typeof binding === 'string') {
    return event.key === binding;
  }

  return (Object.keys(binding) as (keyof KeyDetectedEvent)[]).every((key) => event[key] === binding[key]);
});
