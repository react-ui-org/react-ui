import { ReactNode } from 'react';

export type TranslationsProviderProps = {
  children?: ReactNode;
  translations?: Record<string, unknown>;
};
