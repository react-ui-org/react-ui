import type { Locator } from '@playwright/test';
import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';
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

          const component = await mount('MultiSelectField/MultiSelectFieldForTest', props);

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

            const component = await mount('MultiSelectField/MultiSelectFieldForTest', props);

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

        const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
          helpText: testHelpText,
          id: testId,
          label: testLabel,
          options: baseOptions,
          validationText: testValidationText,
        });

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

      test('has accessible name and ARIA references without id', async ({ mount }) => {
        const component = await mount('MultiSelectField/MultiSelectFieldForTest');

        const combobox = component.getByRole('combobox');
        await expect(combobox).toHaveAccessibleName('test-label');
        await expect(component.getByRole('grid')).toHaveAccessibleName('test-label');

        await combobox.click();

        await expect(component.getByRole('listbox')).toHaveAccessibleName('test-label');

        const listboxId = await component.getByRole('listbox').getAttribute('id');
        expect(listboxId).toBeTruthy();
        await expect(combobox).toHaveAttribute('aria-controls', listboxId!);

        await combobox.press('ArrowDown');

        const optionId = await component.getByRole('option', { name: 'option1' }).getAttribute('id');
        expect(optionId).toBeTruthy();
        await expect(combobox).toHaveAttribute('aria-activedescendant', optionId!);
      });

      test('ref', async ({ mount }) => {
        const component = await mount('MultiSelectField/MultiSelectFieldForRefTest', {
          testRefAttrName: 'test-ref',
          testRefAttrValue: 'test-ref-value',
        });

        await expect(component.getByRole('combobox')).toHaveAttribute('test-ref', 'test-ref-value');
      });

      test('renders custom translations', async ({
        mount,
        page,
      }) => {
        const component = await mount('MultiSelectField/MultiSelectFieldForTranslationsTest');

        await expect(component.getByRole('button', { name: 'Remove this tag option1' })).toBeAttached();
        await expect(component.getByRole('row', { name: 'option1' })).toHaveAccessibleDescription('Delete removes this tag');

        await component.getByRole('combobox').click();
        await page.keyboard.type('nonexistent');

        await expect(component.getByText('Nothing found')).toBeVisible();
      });
    });

    test.describe('functionality', () => {
      test.describe('opening', () => {
        test('opens dropdown on mouse click', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(component.getByRole('combobox')).toBeFocused();
          await expect(component.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
        });

        test('opens dropdown and focuses the input on clicking the label', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByText('test-label').click();

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(component.getByRole('combobox')).toBeFocused();
        });

        ['Enter', 'Space', 'ArrowDown', 'ArrowUp'].forEach((openKey) => {
          test(`opens dropdown on ${openKey} key press`, async ({ mount }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest');

            const combobox = component.getByRole('combobox');
            await combobox.focus();
            await combobox.press(openKey);

            // The listbox may be empty, e.g. when Space typed into the search matches no option
            await expect(component.getByRole('listbox')).toBeAttached();
            await expect(combobox).toHaveAttribute('aria-expanded', 'true');
          });
        });

        [
          ['ArrowDown', 'option1'],
          ['ArrowUp', 'option2'],
        ].forEach(([openKey, activeOptionName]) => {
          test(`activates ${activeOptionName} on opening dropdown by ${openKey} key press`, async ({ mount }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest');

            const combobox = component.getByRole('combobox');
            await combobox.focus();
            await combobox.press(openKey);

            const optionId = await component.getByRole('option', { name: activeOptionName }).getAttribute('id');
            await expect(combobox).toHaveAttribute('aria-activedescendant', optionId!);
            await expect(combobox).toBeFocused();
          });
        });

        test('opens dropdown on character key press', async ({
          mount,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('o');

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(combobox).toBeFocused();
          await expect(combobox).toHaveValue('o');
        });

        test('does not open dropdown on focus', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').focus();

          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('does not open dropdown when disabled', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            disabled: true,
          });

          const combobox = component.getByRole('combobox');
          await expect(combobox).toBeDisabled();

          // `force` is needed as Playwright refuses to click disabled elements
          await combobox.click({ force: true });

          await expect(component.getByRole('listbox')).toHaveCount(0);

          // Disabled tags can be neither removed nor focused
          await expect(component.getByRole('row', { name: 'option1' })).toBeVisible();
          await expect(component.getByRole('row', { name: 'option1' })).toHaveAttribute('tabindex', '-1');
          await expect(component.getByRole('button')).toHaveCount(0);
        });
      });

      test.describe('closing', () => {
        test('closes dropdown on Escape key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await page.keyboard.press('Escape');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
          await expect(combobox).toHaveAttribute('aria-expanded', 'false');
        });

        test('closes dropdown on Escape key press with an active option', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await page.keyboard.press('ArrowDown');
          await expect(combobox).toHaveAttribute('aria-activedescendant');

          await page.keyboard.press('Escape');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
          await expect(combobox).not.toHaveAttribute('aria-activedescendant');
        });

        test('closes dropdown on Escape key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await page.keyboard.press('Shift+Tab');
          await expect(component.getByRole('row', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Escape');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
        });

        test('closes dropdown on moving focus out of the field', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForFocusTests');

          await component.getByRole('combobox').first().click();
          await expect(component.getByRole('listbox')).toBeVisible();

          // Tab moves focus from the input of the first field to the tags of the second field
          await page.keyboard.press('Tab');

          await expect(component.getByRole('row', { name: 'option1' }).last()).toBeFocused();
          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('closes dropdown on clicking the caret', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          // The caret is placed right of the input
          const box = await combobox.boundingBox();
          await page.mouse.click(box!.x + box!.width + 16, box!.y + box!.height / 2);

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
        });

        test('does not close dropdown on clicking the input', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await component.getByRole('combobox').click();

          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('closes dropdown on clicking outside the field', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

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
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.type('option2');
          await expect(component.getByRole('option')).toHaveCount(1);

          await page.keyboard.press('Escape');
          await expect(combobox).toHaveValue('');
          await combobox.press('Enter');

          // All options are displayed again
          await expect(component.getByRole('option')).toHaveCount(2);
        });
      });

      test.describe('selection', () => {
        test('selects an option on click', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          await component.getByRole('combobox').click();
          await component.getByRole('option', { name: 'option1' }).click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
          await expect(component.getByRole('row', { name: 'option1' })).toBeVisible();
          // Dropdown stays open to allow selecting more options
          await expect(component.getByRole('listbox')).toBeVisible();
          // Focus stays in the input
          await expect(component.getByRole('combobox')).toBeFocused();
        });

        test('unselects a selected option on click', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1'],
          });

          await component.getByRole('combobox').click();
          await component.getByRole('option', { name: 'option1' }).click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([[]]);
          await expect(component.getByRole('row', { name: 'option1' })).toHaveCount(0);
        });

        test('selects the active option on Enter key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');

          await expect(component.getByRole('listbox')).toBeVisible();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
          await expect(combobox).toBeFocused();
        });

        test('types a space instead of selecting on Space key press when search is enabled', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Space');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
          await expect(combobox).toHaveValue(' ');
        });

        test('selects an option filtered by search', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          await component.getByRole('combobox').click();
          await page.keyboard.type('option2');
          await component.getByRole('option', { name: 'option2' }).click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value2']]);
        });

        ['click', 'Enter'].forEach((selectMethod) => {
          test(`clears the search on selecting an option by ${selectMethod}`, async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
              initialValue: [],
            });

            const combobox = component.getByRole('combobox');
            await combobox.click();
            await page.keyboard.type('option2');
            await expect(component.getByRole('option')).toHaveCount(1);

            if (selectMethod === 'click') {
              await component.getByRole('option', { name: 'option2' }).click();
            } else {
              await page.keyboard.press('ArrowDown');
              await page.keyboard.press('Enter');
            }

            await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value2']]);
            await expect(combobox).toHaveValue('');
            await expect(combobox).not.toHaveAttribute('aria-activedescendant');
            // All options are displayed again and the dropdown stays open
            await expect(component.getByRole('option')).toHaveCount(2);
            await expect(combobox).toBeFocused();
          });
        });

        test('does not select a disabled option', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
            options: partiallyDisabledOptions,
          });

          await component.getByRole('combobox').click();

          // `force` is needed as Playwright refuses to click elements with `aria-disabled="true"`
          await component.getByRole('option', { name: 'option2' }).click({ force: true });

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('does not select an option after the field was disabled with the dropdown open', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          await component.getByRole('combobox').click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await component.update({
            disabled: true,
            initialValue: [],
          });

          const option = component.getByRole('option', { name: 'option1' });
          await expect(option).toHaveAttribute('aria-disabled', 'true');
          // `force` is needed as Playwright refuses to click elements with `aria-disabled="true"`
          await option.click({ force: true });

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
        });
      });

      test.describe('navigation', () => {
        const expectActiveOption = async (
          component: Locator,
          name: string,
        ) => {
          const optionId = await component.getByRole('option', { name }).getAttribute('id');
          await expect(component.getByRole('combobox')).toHaveAttribute('aria-activedescendant', optionId!);
          await expect(component.getByRole('combobox')).toBeFocused();
        };

        test('activates the first option on ArrowDown key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();
          await page.keyboard.press('ArrowDown');

          await expectActiveOption(component, 'option1');
        });

        test('activates the last option on ArrowUp key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();
          await page.keyboard.press('ArrowUp');

          await expectActiveOption(component, 'option2');
        });

        test('skips disabled options on arrow key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            options: partiallyDisabledOptions,
          });

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option1');

          // The disabled option2 is skipped
          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option3');
        });

        test('moves across group boundaries on arrow key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            options: groupedOptions,
          });

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option1');

          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option2');

          // The first option of the following group becomes active
          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option3');
        });

        test('wraps around at the first and last option', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowUp');
          await expectActiveOption(component, 'option2');

          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option1');
        });

        test('activates the first and last option on Home and End key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            options: groupedOptions,
          });

          await component.getByRole('combobox').click();
          await page.keyboard.press('ArrowDown');

          await page.keyboard.press('End');
          await expectActiveOption(component, 'option4');

          await page.keyboard.press('Home');
          await expectActiveOption(component, 'option1');
        });

        test('opens dropdown without activating an option on Alt + Arrow Down key press', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Alt+ArrowDown');

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(combobox).not.toHaveAttribute('aria-activedescendant');
        });

        test('closes dropdown on Alt + Arrow Up key press', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await combobox.press('Alt+ArrowUp');

          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
        });

        ['ArrowLeft', 'ArrowRight'].forEach((cursorKey) => {
          test(`returns to editing the search on ${cursorKey} key press`, async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest');

            const combobox = component.getByRole('combobox');
            await combobox.click();
            await page.keyboard.type('opt');
            await page.keyboard.press('ArrowLeft');
            await page.keyboard.press('ArrowDown');
            await expect(combobox).toHaveAttribute('aria-activedescendant');

            await page.keyboard.press(cursorKey);

            await expect(combobox).not.toHaveAttribute('aria-activedescendant');
            await expect(component.getByRole('listbox')).toBeVisible();
            // The cursor moves within the search text as usual
            await expect.poll(() => combobox.evaluate(
              (input: HTMLInputElement) => input.selectionStart,
            )).toBe(cursorKey === 'ArrowLeft' ? 1 : 3);
          });
        });

        test('makes tags a single tab stop navigable by arrow keys', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          const firstTag = component.getByRole('row', { name: 'option1' });
          const secondTag = component.getByRole('row', { name: 'option2' });

          // Tags are reachable while the dropdown is closed
          await combobox.focus();
          await page.keyboard.press('Shift+Tab');
          await expect(firstTag).toBeFocused();

          await page.keyboard.press('ArrowRight');
          await expect(secondTag).toBeFocused();

          await page.keyboard.press('ArrowRight');
          await expect(firstTag).toBeFocused();

          await page.keyboard.press('End');
          await expect(secondTag).toBeFocused();

          await page.keyboard.press('Home');
          await expect(firstTag).toBeFocused();

          // The remove button of the focused tag is the next tab stop, followed by the input
          await page.keyboard.press('Tab');
          await expect(component.getByRole('button', { name: 'Remove option1' })).toBeFocused();

          await page.keyboard.press('Tab');
          await expect(combobox).toBeFocused();
        });
      });

      test.describe('tags', () => {
        test('removes a tag on clicking its remove button', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1'],
          });

          await component.getByRole('button', { name: 'Remove option1' }).click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([[]]);
          await expect(component.getByRole('row', { name: 'option1' })).toHaveCount(0);
          // Clicking a tag must not open the dropdown
          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('does not remove a tag on clicking its label', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1'],
          });

          await component.getByRole('row', { name: 'option1' }).getByText('option1').click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        ['Enter', 'Space'].forEach((removeKey) => {
          test(`removes a tag on ${removeKey} key press on its remove button`, async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
              initialValue: ['value1', 'value2'],
            });

            await component.getByRole('row', { name: 'option2' }).focus();
            await page.keyboard.press('Tab');
            await expect(component.getByRole('button', { name: 'Remove option2' })).toBeFocused();

            await page.keyboard.press(removeKey);

            await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
            await expect(component.getByRole('row', { name: 'option1' })).toBeFocused();
          });
        });

        ['Delete', 'Backspace'].forEach((removeKey) => {
          test(`removes a tag on ${removeKey} key press`, async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
              initialValue: ['value1', 'value2'],
            });

            // Backspace in the empty input moves focus to the last tag
            const combobox = component.getByRole('combobox');
            await combobox.focus();
            await combobox.press('Backspace');
            await expect(component.getByRole('row', { name: 'option2' })).toBeFocused();

            await page.keyboard.press(removeKey);

            await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
            // Focus moves to the previous tag
            await expect(component.getByRole('row', { name: 'option1' })).toBeFocused();
          });
        });

        test('moves focus to the next tag on removing the first tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Shift+Tab');
          await expect(component.getByRole('row', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Delete');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value2']]);
          // There is no previous tag, focus moves to the next one
          await expect(component.getByRole('row', { name: 'option2' })).toBeFocused();
          await expect(component.getByRole('row', { name: 'option2' })).toHaveAttribute('tabindex', '0');
        });

        test('moves focus to the last tag on Backspace key press in the empty search input', async ({
          mount,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Enter');
          await combobox.press('Backspace');

          await expect(component.getByRole('row', { name: 'option2' })).toBeFocused();
        });
      });

      test.describe('search', () => {
        test('filters options on typing into the search input', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();
          await page.keyboard.type('option2');

          await expect(component.getByRole('option')).toHaveCount(1);
          await expect(component.getByRole('option', { name: 'option2' })).toBeVisible();
        });

        test('displays text item when no options match the search', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();
          await page.keyboard.type('nonexistent');

          await expect(component.getByRole('option')).toHaveCount(0);
          await expect(component.getByText('No options')).toBeVisible();
          // A listbox may only contain options and groups
          await expect(component.getByRole('listbox').getByText('No options')).toHaveCount(0);
        });

        test('reopens dropdown on typing into the focused search input', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          // Removing the only tag with dropdown closed moves focus to the search input
          await component.getByRole('button', { name: 'Remove option1' }).click();
          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(component.getByRole('combobox')).toBeFocused();

          await page.keyboard.type('option2');

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(component.getByRole('option', { name: 'option2' })).toBeVisible();
        });

        test('makes the input read-only when search is disabled', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();

          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(combobox).toHaveAttribute('readonly');
          await expect(combobox).not.toHaveAttribute('aria-autocomplete');

          await page.keyboard.type('option2');
          await expect(combobox).toHaveValue('');
          await expect(component.getByRole('option')).toHaveCount(2);
        });

        test('selects the active option on Space key press when search is disabled', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
            searchAlgorithm: null,
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('Space');
          await expect(component.getByRole('listbox')).toBeVisible();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Space');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
        });

        test('does not open dropdown on typing a character when search is disabled', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await combobox.press('o');

          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('moves focus to the input on removing the last tag when search is disabled', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          await component.getByRole('button', { name: 'Remove option1' }).click();

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

          const component = await mount('MultiSelectField/MultiSelectFieldForFormLayoutTests', props);

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
