import {
  expect,
  test,
} from '../../../../tests/playwright';

test.describe('PopoverWrapper', () => {
  test.describe('non-visual', () => {
    const tags = [
      'div',
      'span',
    ];

    tags.forEach((tag) => {
      test(`Render tag: ${tag}`, async ({ mount }) => {
        const component = await mount('PopoverWrapper/PopoverWrapperForTest', {
          tag,
        });

        const tagName = await component.evaluate((element) => element.tagName);
        expect(tagName.toLowerCase()).toBe(tag);
        await component.unmount();
      });
    });

    test('id', async ({ mount }) => {
      const id = 'custom-id';
      const childrenText = 'Some text';

      const component = await mount('PopoverWrapper/PopoverWrapperForTest', {
        children: childrenText,
        id,
      });

      await expect(component.getByText(childrenText)).toHaveAttribute('id', id);
    });
  });
});
