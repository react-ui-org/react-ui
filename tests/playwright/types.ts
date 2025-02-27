import type { Page } from 'playwright/test';

export type PropTest = {
  name: string,
  onBeforeTest?: (page: Page) => Promise<void>,
  props: {
    [name: string]: unknown
  },
};

export type PropTests = PropTest[];
