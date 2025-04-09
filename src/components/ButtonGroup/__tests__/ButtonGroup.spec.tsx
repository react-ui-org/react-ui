import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  mixPropTests,
  propTests,
} from '../../../../tests/playwright';
import {
  ButtonGroupForTest,
  SelectedButtonGroupForTest,
} from './ButtonGroup.story';

test.describe('ButtonGroup', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.blockPropTest,
        ...propTests.disabledPropTest,
        ...propTests.sizePropTest,
        ...mixPropTests([
          propTests.priorityPropTest,
          propTests.disabledPropTest,
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

          const component = await mount(<ButtonGroupForTest {...props} />);

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });

      test.describe('selectedButton', () => {
        [
          ...mixPropTests([
            propTests.priorityPropTest,
            propTests.disabledPropTest,
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

            const component = await mount(<SelectedButtonGroupForTest {...props} />);

            if (onBeforeSnapshot) {
              await onBeforeSnapshot(page, component);
            }

            const screenshot = await component.screenshot();
            expect(screenshot).toMatchSnapshot();
          });
        });
      });
    });
  });
});
