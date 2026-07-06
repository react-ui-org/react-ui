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
  MultiSelectFieldForTest,
  MultiSelectFieldForRefTest,
  MultiSelectFieldForFocusTests,
  MultiSelectFieldForTranslationsTest,
  MultiSelectFieldForFormLayoutTests,
} from './MultiSelectField.story';
import type { MultiSelectFieldForFormLayoutTestsProps } from './MultiSelectField.story';
import { openMultiSelectFieldOptionsTest } from './_propTests/openMultiSelectFieldOptionsTest';

const baseOptions = [
  {
    disabled: false,
    key: 'key1',
    label: 'option1',
    value: 'value1',
  },
  {
    disabled: false,
    label: 'option2',
    value: 'value2',
  },
];

const partiallyDisabledOptions = [
  {
    disabled: false,
    label: 'option1',
    value: 'value1',
  },
  {
    disabled: true,
    label: 'option2',
    value: 'value2',
  },
  {
    disabled: false,
    label: 'option3',
    value: 'value3',
  },
];

const groupedOptions = [
  {
    label: 'optgroup1',
    options: [
      {
        disabled: false,
        label: 'option1',
        value: 'value1',
      },
      {
        disabled: false,
        label: 'option2',
        value: 'value2',
      },
    ],
  },
  {
    label: 'optgroup2',
    options: [
      {
        disabled: false,
        label: 'option3',
        value: 'value3',
      },
      {
        disabled: false,
        label: 'option4',
        value: 'value4',
      },
    ],
  },
];

test.describe('MultiSelectField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.helpTextAndValidationTextPropType,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPropTest,
        ...propTests.renderAsRequiredPropTest,
        ...propTests.requiredPropTest,
        ...propTests.sizePropTest,
        ...mixPropTests([
          propTests.fullWidthPropTest,
          propTests.layoutPropTest,
        ]),
        ...mixPropTests([
          propTests.requiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.renderAsRequiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.disabledPropTest,
          propTests.validationStatePropTest,
          propTests.variantPropTest,
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

          const component = await mount(
            <MultiSelectFieldForTest
              {...props}
            />,
          );

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot({ animations: 'disabled' });
          expect(screenshot).toMatchSnapshot();
        });
      });

      /**
       * Full page screenshot is required for the dropdown tests because the dropdown
       * is rendered outside of the bounding box of the component root element.
       */
      test.describe('fullPage', () => {
        [
          ...openMultiSelectFieldOptionsTest,
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
            // The field with its open dropdown only covers a small part of the page
            await page.setViewportSize({
              height: 320,
              width: 320,
            });

            if (onBeforeTest) {
              await onBeforeTest(page);
            }

            const component = await mount(
              <MultiSelectFieldForTest
                {...props}
              />,
            );

            if (onBeforeSnapshot) {
              await onBeforeSnapshot(page, component);
            }

            const screenshot = await page.screenshot({ animations: 'disabled' });
            expect(screenshot).toMatchSnapshot({ maxDiffPixelRatio: 0.001 });
          });
        });
      });
    });

    test.describe('non-visual', () => {
      test('id', async ({ mount }) => {
        const testId = 'testId';
        const testLabel = 'testLabel';
        const testHelpText = 'testHelpText';
        const testValidationText = 'testValidationText';

        const component = await mount(
          <MultiSelectFieldForTest
            helpText={testHelpText}
            id={testId}
            label={testLabel}
            options={baseOptions}
            validationText={testValidationText}
          />,
        );

        await expect(component.getByRole('combobox')).toHaveAttribute('id', testId);
        await expect(component.getByText(testHelpText)).toHaveAttribute('id', `${testId}__helpText`);
        await expect(component.getByText(testValidationText)).toHaveAttribute('id', `${testId}__validationText`);
        await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
        await expect(component).toHaveAttribute('id', `${testId}__label`);

        await component.getByRole('combobox').click();

        await expect(component.getByRole('listbox')).toHaveAttribute('id', `${testId}__dropdown`);
        await expect(component.getByRole('option').first()).toHaveAttribute('id', `${testId}__item__${baseOptions[0].key}`);
        await expect(component.getByRole('option').last()).toHaveAttribute('id', `${testId}__item__${baseOptions[1].value}`);
      });

      test('ref', async ({ mount }) => {
        const component = await mount(
          <MultiSelectFieldForRefTest
            testRefAttrName="test-ref"
            testRefAttrValue="test-ref-value"
          />,
        );

        await expect(component.getByRole('combobox')).toHaveAttribute('test-ref', 'test-ref-value');
      });

      test('renders custom translations', async ({
        mount,
        page,
      }) => {
        const component = await mount(
          <MultiSelectFieldForTranslationsTest />,
        );

        await expect(component.getByRole('button', { name: 'option1' })).toHaveAttribute('title', 'Remove this tag');
        await expect(component.getByRole('textbox')).toHaveAttribute('aria-label', 'Search options');

        await component.getByRole('combobox').click();
        await page.keyboard.type('nonexistent');

        await expect(component.getByText('Nothing found')).toBeVisible();
      });
    });

    test.describe('functionality', () => {
      test.describe('opening', () => {
        test('opens dropdown on mouse click', async ({ mount }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();

          await expect(component.getByRole('listbox')).toBeVisible();
          // Focus moves to the search input
          await expect(component.getByRole('textbox')).toBeFocused();
        });

        ['Enter', 'Space', 'ArrowDown', 'ArrowUp'].forEach((openKey) => {
          test(`opens dropdown on ${openKey} key press`, async ({ mount }) => {
            const component = await mount(
              <MultiSelectFieldForTest />,
            );

            const combobox = component.getByRole('combobox');
            await combobox.focus();
            await combobox.press(openKey);

            await expect(component.getByRole('listbox')).toBeVisible();
          });
        });

        test('opens dropdown on character key press', async ({
          mount,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('o');

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(component.getByRole('textbox')).toBeFocused();
        });

        test('does not open dropdown when disabled', async ({ mount }) => {
          let receivedValue = null;

          const component = await mount(
            <MultiSelectFieldForTest
              disabled
              onChange={(value) => {
                receivedValue = value;
              }}
            />,
          );

          // `force` is needed as Playwright refuses to click elements with `aria-disabled="true"`
          const combobox = component.getByRole('combobox');
          await combobox.click({ force: true });

          await expect(component.getByRole('listbox')).toHaveCount(0);

          // Disabled tags are not removable
          const tag = component.getByRole('button', { name: 'option1' });
          await tag.click({ force: true });
          await expect(tag).toBeVisible();
          expect(receivedValue).toBeNull();
        });
      });

      test.describe('closing', () => {
        test('closes dropdown on Escape key press in the search input', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await page.keyboard.press('Escape');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
        });

        test('closes dropdown on Escape key press on a focused option', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await page.keyboard.press('ArrowDown');
          await expect(component.getByRole('option', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Escape');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
        });

        test('closes dropdown on Escape key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          // Open using keyboard as clicking the center of the input could hit one of the tags
          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await page.keyboard.press('Shift+Tab');
          await expect(component.getByRole('button', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Escape');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
        });

        test('closes dropdown on Escape key press on the input', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          // Open using keyboard as clicking the center of the input could hit one of the tags
          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          // Walk back from the search input to the input itself
          await page.keyboard.press('Shift+Tab');
          await page.keyboard.press('Shift+Tab');
          await expect(combobox).toBeFocused();

          await page.keyboard.press('Escape');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
        });

        test('closes dropdown on moving focus out of the field', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForFocusTests />,
          );

          await component.getByRole('combobox').first().click();
          await expect(component.getByRole('listbox')).toBeVisible();

          // Tab moves focus from the search input of the first field to the second field
          await page.keyboard.press('Tab');

          await expect(component.getByRole('combobox').last()).toBeFocused();
          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('closes dropdown on clicking the input', async ({ mount }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          // Click next to the caret so neither a tag nor the search input is hit
          await combobox.click({
            position: {
              x: 230,
              y: 17,
            },
          });

          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('does not close dropdown on clicking the search input', async ({ mount }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await component.getByRole('textbox').click();

          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('closes dropdown on clicking outside the field', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();
          await expect(component.getByRole('listbox')).toBeVisible();

          // Click far away from the component and its dropdown
          await page.mouse.click(600, 500);

          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('clears the search input on closing the dropdown', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.type('option2');
          await expect(component.getByRole('option')).toHaveCount(1);

          await page.keyboard.press('Escape');
          await combobox.press('Enter');

          // All options are displayed again
          await expect(component.getByRole('option')).toHaveCount(2);
        });
      });

      test.describe('selection', () => {
        test('selects an option on click', async ({ mount }) => {
          let receivedValue = null;

          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={[]}
              onChange={(value) => {
                receivedValue = value;
              }}
            />,
          );

          await component.getByRole('combobox').click();
          await component.getByRole('option', { name: 'option1' }).click();

          expect(receivedValue).toEqual(['value1']);
          await expect(component.getByRole('button', { name: 'option1' })).toBeVisible();
          // Dropdown stays open to allow selecting more options
          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('unselects a selected option on click', async ({ mount }) => {
          let receivedValue = null;

          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={['value1']}
              onChange={(value) => {
                receivedValue = value;
              }}
            />,
          );

          await component.getByRole('combobox').click();
          await component.getByRole('option', { name: 'option1' }).click();

          expect(receivedValue).toEqual([]);
          await expect(component.getByRole('button', { name: 'option1' })).toHaveCount(0);
        });

        ['Enter', 'Space'].forEach((selectKey) => {
          test(`selects an option on ${selectKey} key press`, async ({
            mount,
            page,
          }) => {
            let receivedValue = null;

            const component = await mount(
              <MultiSelectFieldForTest
                initialValue={[]}
                onChange={(value) => {
                  receivedValue = value;
                }}
              />,
            );

            const combobox = component.getByRole('combobox');
            await combobox.focus();
            await combobox.press('Enter');

            await expect(component.getByRole('listbox')).toBeVisible();

            await page.keyboard.press('ArrowDown');
            await expect(component.getByRole('option', { name: 'option1' })).toBeFocused();

            await page.keyboard.press(selectKey);
            expect(receivedValue).toEqual(['value1']);
          });
        });

        test('selects an option filtered by search', async ({
          mount,
          page,
        }) => {
          let receivedValue = null;

          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={[]}
              onChange={(value) => {
                receivedValue = value;
              }}
            />,
          );

          await component.getByRole('combobox').click();
          await page.keyboard.type('option2');
          await component.getByRole('option', { name: 'option2' }).click();

          expect(receivedValue).toEqual(['value2']);
        });

        test('does not select a disabled option', async ({ mount }) => {
          let receivedValue = null;

          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={[]}
              onChange={(value) => {
                receivedValue = value;
              }}
              options={partiallyDisabledOptions}
            />,
          );

          await component.getByRole('combobox').click();

          // `force` is needed as Playwright refuses to click elements with `aria-disabled="true"`
          await component.getByRole('option', { name: 'option2' }).click({ force: true });

          expect(receivedValue).toBeNull();
          await expect(component.getByRole('listbox')).toBeVisible();
        });
      });

      test.describe('navigation', () => {
        test('moves focus to the first option on ArrowDown key press in the search input', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();
          await page.keyboard.press('ArrowDown');

          await expect(component.getByRole('option', { name: 'option1' })).toBeFocused();
        });

        test('moves focus to the last option on ArrowUp key press in the search input', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();
          await page.keyboard.press('ArrowUp');

          await expect(component.getByRole('option', { name: 'option2' })).toBeFocused();
        });

        test('skips disabled options on arrow key press', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              options={partiallyDisabledOptions}
            />,
          );

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await expect(component.getByRole('option', { name: 'option1' })).toBeFocused();

          // The disabled option2 is skipped
          await page.keyboard.press('ArrowDown');
          await expect(component.getByRole('option', { name: 'option3' })).toBeFocused();
        });

        test('moves focus across group boundaries on arrow key press', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              options={groupedOptions}
            />,
          );

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await expect(component.getByRole('option', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('ArrowDown');
          await expect(component.getByRole('option', { name: 'option2' })).toBeFocused();

          // Focus moves to the first option of the following group
          await page.keyboard.press('ArrowDown');
          await expect(component.getByRole('option', { name: 'option3' })).toBeFocused();
        });

        test('does not move focus past the first or last option', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowUp');
          await expect(component.getByRole('option', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await expect(component.getByRole('option', { name: 'option2' })).toBeFocused();
        });

        test('moves focus through tags to the search input on Tab key press', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={['value1', 'value2']}
            />,
          );

          // Open using keyboard as clicking the center of the input could hit one of the tags
          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          // Walk back to the input first
          await page.keyboard.press('Shift+Tab');
          await page.keyboard.press('Shift+Tab');
          await page.keyboard.press('Shift+Tab');
          await expect(combobox).toBeFocused();

          await page.keyboard.press('Tab');
          await expect(component.getByRole('button', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Tab');
          await expect(component.getByRole('button', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('Tab');
          await expect(component.getByRole('textbox')).toBeFocused();
        });
      });

      test.describe('tags', () => {
        test('removes a tag on click', async ({ mount }) => {
          let receivedValue = null;

          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={['value1']}
              onChange={(value) => {
                receivedValue = value;
              }}
            />,
          );

          await component.getByRole('button', { name: 'option1' }).click();

          expect(receivedValue).toEqual([]);
          await expect(component.getByRole('button', { name: 'option1' })).toHaveCount(0);
          // Clicking a tag must not open the dropdown
          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        ['Delete', 'Backspace'].forEach((removeKey) => {
          test(`removes a tag on ${removeKey} key press`, async ({
            mount,
            page,
          }) => {
            let receivedValue = null;

            const component = await mount(
              <MultiSelectFieldForTest
                initialValue={['value1', 'value2']}
                onChange={(value) => {
                  receivedValue = value;
                }}
              />,
            );

            // Open using keyboard as clicking the center of the input could hit one of the tags
            const combobox = component.getByRole('combobox');
            await combobox.focus();
            await combobox.press('Enter');

            // Focus moves from the search input back to the last tag
            await page.keyboard.press('Shift+Tab');
            await expect(component.getByRole('button', { name: 'option2' })).toBeFocused();

            await page.keyboard.press(removeKey);

            expect(receivedValue).toEqual(['value1']);
            // Focus moves to the previous tag
            await expect(component.getByRole('button', { name: 'option1' })).toBeFocused();
          });
        });

        test('moves focus to the next tag on removing the first tag', async ({
          mount,
          page,
        }) => {
          let receivedValue = null;

          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={['value1', 'value2']}
              onChange={(value) => {
                receivedValue = value;
              }}
            />,
          );

          // Open using keyboard as clicking the center of the input could hit one of the tags
          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await page.keyboard.press('Shift+Tab');
          await page.keyboard.press('Shift+Tab');
          await expect(component.getByRole('button', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Delete');

          expect(receivedValue).toEqual(['value2']);
          // There is no previous tag, focus moves to the next one
          await expect(component.getByRole('button', { name: 'option2' })).toBeFocused();
        });

        test('moves focus to the last tag on Backspace key press in the empty search input', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              initialValue={['value1', 'value2']}
            />,
          );

          // Open using keyboard as clicking the center of the input could hit one of the tags
          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await page.keyboard.press('Backspace');

          await expect(component.getByRole('button', { name: 'option2' })).toBeFocused();
        });
      });

      test.describe('search', () => {
        test('filters options on typing into the search input', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();
          await page.keyboard.type('option2');

          await expect(component.getByRole('option')).toHaveCount(1);
          await expect(component.getByRole('option', { name: 'option2' })).toBeVisible();
        });

        test('displays text item when no options match the search', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          await component.getByRole('combobox').click();
          await page.keyboard.type('nonexistent');

          await expect(component.getByRole('option')).toHaveCount(0);
          await expect(component.getByText('No options')).toBeVisible();
        });

        test('reopens dropdown on typing into the focused search input', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest />,
          );

          // Removing the only tag with dropdown closed moves focus to the search input
          await component.getByRole('button', { name: 'option1' }).click();
          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(component.getByRole('textbox')).toBeFocused();

          await page.keyboard.type('option2');

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(component.getByRole('option', { name: 'option2' })).toBeVisible();
        });

        test('does not render search input when search is disabled', async ({ mount }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              searchAlgorithm={null}
            />,
          );

          await component.getByRole('combobox').click();

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(component.getByRole('textbox')).toHaveCount(0);
        });

        test('moves focus to the first option on open when search is disabled', async ({
          mount,
          page,
        }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              searchAlgorithm={null}
            />,
          );

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await expect(component.getByRole('option', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Escape');
          await expect(combobox).toBeFocused();
        });

        test('does not open dropdown on typing a character when search is disabled', async ({ mount }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              searchAlgorithm={null}
            />,
          );

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('o');

          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('moves focus to the input on removing the last tag when search is disabled', async ({ mount }) => {
          const component = await mount(
            <MultiSelectFieldForTest
              searchAlgorithm={null}
            />,
          );

          await component.getByRole('button', { name: 'option1' }).click();

          await expect(component.getByRole('button')).toHaveCount(0);
          await expect(component.getByRole('combobox')).toBeFocused();
        });
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      [
        ...propTests.layoutPropTest,
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

          const component = await mount(
            <MultiSelectFieldForFormLayoutTests
              {...props as unknown as MultiSelectFieldForFormLayoutTestsProps}
            />,
          );

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot({ animations: 'disabled' });
          expect(screenshot).toMatchSnapshot();
        });
      });
    });
  });
});
