import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { PopoverWrapperForTest } from './PopoverWrapper.story';

test.describe('PopoverWrapper', () => {
  test.describe('non-visual', () => {
    const tags = [
      'div',
      'span',
    ];

    tags.forEach((tag) => {
      test(`Render tag: ${tag}`, async ({ mount }) => {
        const component = await mount(
          <PopoverWrapperForTest tag={tag} />,
        );

        const tagName = await component.evaluate((element) => element.tagName);
        expect(tagName.toLowerCase()).toBe(tag);
        await component.unmount();
      });
    });

    test('id', async ({ mount }) => {
      const id = 'custom-id';
      const childrenText = 'Some text';

      const component = await mount(
        <PopoverWrapperForTest id={id}>
          {childrenText}
        </PopoverWrapperForTest>,
      );

      await expect(component.getByText(childrenText)).toHaveAttribute('id', id);
    });
  });
});
