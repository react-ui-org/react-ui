import { ReactNode } from 'react';

export type GlobalPropsProviderProps = {
  children: ReactNode
  globalProps: Record<string, unknown>
};
