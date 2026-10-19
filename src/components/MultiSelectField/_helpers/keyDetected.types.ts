/**
 * Properties of the key press event that can be matched by a key binding.
 */
export type KeyDetectedEvent = {
  altKey?: boolean;
  ctrlKey?: boolean;
  key: string;
  metaKey?: boolean;
  shiftKey?: boolean;
};

/**
 * Key binding defined as a list of key names or objects with the key press event properties to match.
 */
export type KeyBinding = (string | Partial<KeyDetectedEvent>)[];
