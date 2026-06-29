import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  InputGroupForTest,
  InputGroupWithCustomInputPropsForTest,
  InputGroupWithoutChildrenForTest,
} from './InputGroup.story';
import { validationTextsPropTest } from './_propTests/validationTextsPropTest';
import { validationStatePropTest } from './_propTests/validationStatePropTest';

test.describe('InputGroup', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.disabledPropTest,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.layoutPropTest,
        ...propTests.requiredPropTest,
        ...propTests.sizePropTest,
        ...validationTextsPropTest,
        ...validationStatePropTest,
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

          const hasInputProps = Object.keys(props).some((key) => key.includes('inputProps'));

          const component = await mount(
            hasInputProps
              ? <InputGroupWithCustomInputPropsForTest {...props} />
              : <InputGroupForTest {...props} />,
          );

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });

    test.describe('non-visual', () => {
      test('pass custom id', async ({ mount }) => {
        const id = 'custom-id';
        const label = 'custom-label';

        const component = await mount(
          <InputGroupForTest
            helpTexts={['Help text.']}
            id={id}
            isLabelVisible
            label={label}
            validationTexts={['Validation text.']}
          />,
        );

        await expect(component).toHaveAttribute('id', id);
        await expect(component.getByText(label).first()).toHaveAttribute('id', `${id}__label`);
        await expect(component.getByText(label).last()).toHaveAttribute('id', `${id}__displayLabel`);
        await expect(component.locator(`div[id=${id}__group]`)).not.toBeEmpty();
        await expect(component.getByRole('list').first()).toHaveAttribute('id', `${id}__helpTexts`);
        await expect(component.getByRole('list').last()).toHaveAttribute('id', `${id}__validationTexts`);
      });
    });

    test.describe('functionality', () => {
      test('return null when no children provided', async ({ mount }) => {
        const component = await mount(<InputGroupWithoutChildrenForTest />);

        await expect(component).toBeEmpty();
      });
    });
  });
});
