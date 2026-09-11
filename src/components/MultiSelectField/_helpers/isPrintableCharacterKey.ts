import type { KeyboardEvent } from 'react';

/**
 * Check if the key press event represents typing of a single printable character
 */
export const isPrintableCharacterKey = (event: Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'key' | 'metaKey'>) => (
  event.key.length === 1
  && !event.altKey
  && !event.ctrlKey
  && !event.metaKey
);
