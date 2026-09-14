import type { ReactNode } from 'react';
import type defaultTranslations from '../../translations/en';

export type Translations = typeof defaultTranslations;

/**
 * Translations with any subset of components and keys, merged into the defaults by `TranslationsProvider`.
 * Components not present in the default translations (e.g. of a consuming library) are allowed too.
 */
export type PartialTranslations = {
  [Component in keyof Translations]?: Partial<Translations[Component]>;
} & {
  [component: string]: Record<string, string | undefined> | undefined;
};

/**
 * Props of the `TranslationsProvider` component.
 */
export type TranslationsProviderProps = {
  /**
   * Children wrapped by the provider.
   */
  children?: ReactNode;
  /**
   * Translations to be merged with the ones from the parent providers.
   */
  translations?: PartialTranslations;
};
