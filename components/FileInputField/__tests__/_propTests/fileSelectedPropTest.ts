import type { Page } from 'playwright/test';
import type { MountResult } from '@playwright/experimental-ct-react';
import { propTests } from '../../../../../tests/playwright';
import type { PropTests } from '../../../../../tests/playwright/types';

const onBeforeSnapshot = async (page: Page, component: MountResult) => {
  const virtualFile = {
    buffer: Buffer.from('This is test file.'),
    mimeType: 'text/plain',
    name: 'testfile.txt',
  };

  const inputField = component.locator('input[type="file"]');
  await inputField.setInputFiles(virtualFile);
};

export const fileSelectedPropTest: PropTests = [
  ...propTests.defaultComponentPropTest.map(({
    props,
  }) => ({
    name: 'filledInputField:object',
    onBeforeSnapshot,
    props,
  })),
  ...propTests.validationStatePropTest.map(({
    name,
    props,
  }) => ({
    name: `filledInputField:object ${name}`,
    onBeforeSnapshot,
    props,
  })),
];
