import type {
  HTMLAttributes,
  ReactNode,
} from 'react';

export type TextHyphens = 'none' | 'auto' | 'manual';

export type TextWordWrapping = 'normal' | 'long-words' | 'anywhere';

export type TextProps = HTMLAttributes<HTMLElement> & {
  /**
   * If true, the root HTML element renders as `<div>` instead of `<span>`.
   */
  blockLevel?: boolean;
  /**
   * Text content to be sanitized. Can contain HTML.
   */
  children?: ReactNode;
  /**
   * Turn on hyphenation. Head to [Hyphens](#hyphens) to learn more.
   */
  hyphens?: TextHyphens;
  /**
   * Optional number of lines. If exceeded, the content is truncated and appended by an ellipsis (`…`).
   */
  lines?: number;
  /**
   * How to deal with long words. Head to [Word Wrapping](#word-wrapping) for detailed explanation.
   */
  wordWrapping?: TextWordWrapping;
};
