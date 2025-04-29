import type { ReactNode } from 'react';

export type TranslationsProviderProps = {
  children?: ReactNode;
  translations?: Record<string, unknown>;
};
