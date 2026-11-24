import {
  expect,
  propTests,
  test,
} from '../../../../tests/playwright';

test.describe('Alert', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.feedbackColorPropTest,
      ...propTests.neutralColorPropTest,
      ...propTests.iconPropTest,
      {
        name: 'onClose',
        props: { onClose: () => {} },
      },
    ].forEach(({
      name,
      onBeforeTest,
      onBeforeSnapshot,
      props,
    }) => {
      test(name, async ({
        mount,
        page,
      }) => {
        if (onBeforeTest) {
          await onBeforeTest(page);
        }

        const component = await mount('Alert/AlertForTest', props);

        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const component = await mount('Alert/AlertForTest', {
        id: 'test-id',
      });

      await expect(component).toHaveAttribute('id', 'test-id');
    });
  });

  test.describe('functionality', () => {
    test('calls onClose when close button clicked', async ({ mount }) => {
      const component = await mount('Alert/AlertSpyForTest');
      const closeButton = component.getByRole('button');
      await closeButton.click();

      await expect.poll(() => component.getSpyValue('onClose')).toContain(true);
    });

    test('calls onClose when Enter pressed on close button', async ({ mount }) => {
      const component = await mount('Alert/AlertSpyForTest');
      const closeButton = component.getByRole('button');
      await closeButton.press('Enter');

      await expect.poll(() => component.getSpyValue('onClose')).toContain(true);
    });
  });
});
