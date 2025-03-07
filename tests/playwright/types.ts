import type { MountResult } from '@playwright/experimental-ct-react';
import type { Page } from 'playwright/test';

export type PropTest = {
  name: string,
  onBeforeSnapshot?: (page: Page, component: MountResult) => Promise<void>,
  onBeforeTest?: (page: Page) => Promise<void>,
  props: {
    [name: string]: unknown
  },
};

export type PropTests = PropTest[];
