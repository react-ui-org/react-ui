import type { MountResult } from '@playwright/experimental-ct-react';
import type { Page } from 'playwright/test';

export type PropTest = {
  name: string,
  onBeforeSnapshot?: (page: Page, component: MountResult) => Promise<void>,
  onBeforeTest?: (page: Page) => Promise<void>,
  props: {
    [name: string]: unknown
  }
};

export type PropTests = PropTest[];

/**
 * Props of a story component: the component props with `DefaultedKeys` made optional because the
 * story fills in a default for them.
 */
export type StoryProps<Props, DefaultedKeys extends keyof Props> =
  Omit<Props, DefaultedKeys> & Partial<Pick<Props, DefaultedKeys>>;
