import { ForwardedRef } from 'react';
import { Translation } from '../translations/translations.types';

interface RUIProviderProps {
  children?: React.ReactNode;
  globalProps: Record<string, unknown>;
  translations?: Translation;
}

export interface WithGlobalPropsComponentProps<T = unknown> {
  [key: string]: unknown;
  forwardedRef: ForwardedRef<T>;
}

export default RUIProviderProps;
