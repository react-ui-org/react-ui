import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';
import { labelPropTest } from './_propTests/labelPropTest';
import { priorityPropTest } from './_propTests/priorityPropTest';

test.describe('Badge', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...labelPropTest,
      ...mixPropTests([
        [
          ...propTests.feedbackColorPropTest,
          ...propTests.neutralColorPropTest,
        ],
        priorityPropTest,
      ]),
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

        const component = await mount('Badge/BadgeForTest', props);

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
      const component = await mount('Badge/BadgeForTest', {
        id: 'test-id',
      });

      await expect(component).toHaveAttribute('id', 'test-id');
    });
  });
});
