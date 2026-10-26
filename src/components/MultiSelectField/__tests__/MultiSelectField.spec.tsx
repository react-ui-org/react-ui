import type { MountResult } from '../../../../tests/playwright';
import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';
import { focusedTagTest } from './_propTests/focusedTagTest';
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

const partiallyDisabledGroupedOptions = [
  groupedOptions[0],
  {
    disabled: true,
    label: 'optgroup2',
    options: groupedOptions[1].options,
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
        ...focusedTagTest,
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

      test('describes the combobox by help and validation texts and marks it invalid', async ({ mount }) => {
        const testId = 'testId';
        const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
          helpText: 'testHelpText',
          id: testId,
          validationState: 'invalid',
          validationText: 'testValidationText',
        });

        await expect(component.getByRole('combobox')).toHaveAttribute(
          'aria-describedby',
          `${testId}__helpText ${testId}__validationText`,
        );
        await expect(component.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
      });

      test('keeps aria-describedby passed by the consumer and does not mark a valid field invalid', async ({
        mount,
      }) => {
        const testId = 'testId';
        const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
          'aria-describedby': 'externalDescription',
          helpText: 'testHelpText',
          id: testId,
        });

        await expect(component.getByRole('combobox')).toHaveAttribute(
          'aria-describedby',
          `${testId}__helpText externalDescription`,
        );
        await expect(component.getByRole('combobox')).not.toHaveAttribute('aria-invalid');
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

      test('labels option groups by their presentational headings', async ({ mount }) => {
        const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
          id: 'test-id',
          options: groupedOptions,
        });

        await component.getByRole('combobox').click();

        const group = component.getByRole('group', { name: 'optgroup1' });
        await expect(group).toBeVisible();
        await expect(group).toHaveAttribute('aria-labelledby', 'test-id__group__optgroup1');
        // The heading is not an option, so screen readers do not count it among the options of the listbox
        await expect(group.locator('#test-id__group__optgroup1')).toHaveAttribute('role', 'presentation');
        await expect(group.getByRole('option')).toHaveCount(2);
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
        await expect(component.getByRole('gridcell', { name: 'option1' })).toHaveAccessibleDescription('Delete removes this tag');

        await component.getByRole('combobox').click();
        await page.keyboard.type('nonexistent');

        await expect(component.getByText('Nothing found')).toBeVisible();
      });

      test('marks selected options with aria-selected', async ({ mount }) => {
        const component = await mount('MultiSelectField/MultiSelectFieldForTest');

        await component.getByRole('combobox').click();

        await expect(component.getByRole('option', { name: 'option1' })).toHaveAttribute('aria-selected', 'true');
        await expect(component.getByRole('option', { name: 'option2' })).toHaveAttribute('aria-selected', 'false');
      });

      test('renders no tags grid without selected values', async ({ mount }) => {
        const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
          initialValue: [],
        });

        await expect(component.getByRole('grid')).toHaveCount(0);
        await expect(component.getByRole('gridcell')).toHaveCount(0);
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

        test('calls the click and key down handlers passed by the consumer before handling the events', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('ArrowDown');

          await expect.poll(() => component.getSpyValue('onClick')).toEqual([true]);
          await expect.poll(() => component.getSpyValue('onKeyDown')).toEqual(['ArrowDown']);
          // The field still handles the events itself
          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(combobox).toHaveAttribute('aria-activedescendant');
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

            // Space opens the dropdown and keeps the search text empty, it does not type a leading space
            await expect(combobox).toHaveAttribute('aria-expanded', 'true');
            await expect(combobox).toHaveValue('');
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

        test('keeps focus in the combobox on clicking a group heading', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            options: groupedOptions,
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await component.getByText('optgroup1').click();

          await expect(combobox).toBeFocused();
          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('toggles the dropdown on clicking the combobox when search is disabled', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await combobox.click();
          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(combobox).toBeFocused();
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

          // Disabled tags are visible, cannot be focused and have no remove buttons
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeVisible();
          await expect(component.getByRole('gridcell', { name: 'option1' })).not.toHaveAttribute('tabindex');
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

        test('closes dropdown on moving focus to a tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          // The caret is at the start of the empty search text, so ArrowLeft enters the tags
          await page.keyboard.press('ArrowLeft');

          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();
          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('closes dropdown on moving focus out of the field', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForFocusTests');

          await component.getByRole('combobox').first().click();
          await expect(component.getByRole('listbox')).toBeVisible();

          // Tab moves focus from the input of the first field to the input of the second field
          await page.keyboard.press('Tab');

          await expect(component.getByRole('combobox').last()).toBeFocused();
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
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeVisible();
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
          await expect(component.getByRole('gridcell', { name: 'option1' })).toHaveCount(0);
        });

        test('keeps the dropdown open on clicking an option that the selection removes from the options', async ({
          mount,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForShrinkingOptionsTest');

          await component.getByRole('combobox').click();
          await component.getByRole('option', { name: 'option1' }).click();

          // The clicked option is no longer in the field when the click reaches the document, it still counts
          // as a click inside the field. The tag is labelled by the value, as its option no longer exists.
          await expect(component.getByRole('gridcell', { name: 'value1' })).toBeVisible();
          await expect(component.getByRole('option', { name: 'option1' })).toHaveCount(0);
          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('unselects the active selected option on Enter key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([[]]);
          await expect(combobox).toBeFocused();
        });

        test('does not submit a surrounding form on Enter key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForFormTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();

          // Closed dropdown: Enter opens it
          await page.keyboard.press('Enter');
          await expect(combobox).toHaveAttribute('aria-expanded', 'true');

          // Open dropdown without an active option
          await page.keyboard.press('Enter');
          await expect(combobox).toHaveAttribute('aria-expanded', 'true');

          // Open dropdown with an active option: Enter toggles it
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
          await expect.poll(() => component.getSpyValue('onSubmit')).toEqual([]);
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

        test('types a space into the search text instead of selecting on Space key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.type('option');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Space');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
          await expect(combobox).toHaveValue('option ');
        });

        test('ignores Enter key press without an active option', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('Enter');

          // The dropdown stays open and nothing is selected
          await expect(component.getByRole('listbox')).toBeVisible();
          await expect(combobox).toBeFocused();
          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
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

        test('clears the search on selecting an option by click', async ({
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

          await component.getByRole('option', { name: 'option2' }).click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value2']]);
          await expect(combobox).toHaveValue('');
          // All options are displayed again and the dropdown stays open
          await expect(component.getByRole('option')).toHaveCount(2);
          await expect(combobox).toBeFocused();
        });

        test('keeps the option active after selecting it by Enter key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.type('option2');
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value2']]);
          await expect(combobox).toHaveValue('');
          const optionId = await component.getByRole('option', { name: 'option2' }).getAttribute('id');
          await expect(combobox).toHaveAttribute('aria-activedescendant', optionId!);
          await expect(component.getByRole('option')).toHaveCount(2);
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

        test('does not select an option of a disabled group on click', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
            options: partiallyDisabledGroupedOptions,
          });

          await component.getByRole('combobox').click();

          const option = component.getByRole('option', { name: 'option3' });
          await expect(option).toHaveAttribute('aria-disabled', 'true');
          // `force` is needed as Playwright refuses to click elements with `aria-disabled="true"`
          await option.click({ force: true });

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
        });

        test('ignores Space key press in the open dropdown without an active option', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('Space');

          // A leading space is never a useful search, so nothing is typed and nothing is selected
          await expect(combobox).toHaveValue('');
          await expect(component.getByRole('listbox')).toBeVisible();
          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
        });

        test('ignores Enter key press during IME composition', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: [],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('ArrowDown');
          await expect(combobox).toHaveAttribute('aria-activedescendant');

          // Enter confirms the composed text in an IME, it must not toggle the active option
          await combobox.dispatchEvent('keydown', {
            isComposing: true,
            key: 'Enter',
          });

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
          await expect(component.getByRole('listbox')).toBeVisible();
        });
      });

      test.describe('navigation', () => {
        const expectActiveOption = async (
          component: MountResult,
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

        test('does not move past the first or last option on arrow key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowUp');
          await expectActiveOption(component, 'option1');

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option2');
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

        ['ArrowLeft', 'ArrowRight'].forEach((cursorKey) => {
          test(`keeps the active option on ${cursorKey} key press when search is disabled`, async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              initialValue: ['value1'],
              searchAlgorithm: null,
            });

            await component.getByRole('combobox').focus();
            await page.keyboard.press('ArrowDown');
            await expectActiveOption(component, 'option1');

            // There is no search text to move the cursor in, so the key does nothing and no tag gets focus
            await page.keyboard.press(cursorKey);

            await expectActiveOption(component, 'option1');
          });
        });

        test('moves the cursor within the search text on Home and End key press without an active option', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.type('opt');

          await page.keyboard.press('Home');

          await expect(combobox).not.toHaveAttribute('aria-activedescendant');
          await expect.poll(() => combobox.evaluate((input: HTMLInputElement) => input.selectionStart)).toBe(0);

          await page.keyboard.press('End');

          await expect(combobox).not.toHaveAttribute('aria-activedescendant');
          await expect.poll(() => combobox.evaluate((input: HTMLInputElement) => input.selectionStart)).toBe(3);
        });

        test('keeps the active option on Alt + Arrow Down key press in the open dropdown', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option1');

          await combobox.press('Alt+ArrowDown');

          await expectActiveOption(component, 'option1');
          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('keeps option IDs valid for `aria-activedescendant` when values contain whitespace', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: [],
            options: [
              {
                label: 'Czech Republic',
                value: 'Czech Republic',
              },
            ],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('ArrowDown');

          const activeDescendantId = await combobox.getAttribute('aria-activedescendant');
          expect(activeDescendantId).not.toMatch(/\s/);
          await expect(page.locator(`[id="${activeDescendantId}"]`)).toHaveAccessibleName('Czech Republic');
        });

        [
          ['an unselected', []],
          ['a selected', ['value1']],
        ].forEach(([description, initialValue]) => {
          test(`indicates ${description as string} active option with a visible outline`, async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              initialValue,
            });

            await component.getByRole('combobox').click();
            await page.keyboard.press('ArrowDown');

            const style = await component.getByRole('option', { name: 'option1' }).evaluate((option) => {
              const computedStyle = getComputedStyle(option);

              return {
                backgroundColor: computedStyle.backgroundColor,
                outlineColor: computedStyle.outlineColor,
                outlineOffset: computedStyle.outlineOffset,
                outlineStyle: computedStyle.outlineStyle,
              };
            });

            expect(style.outlineStyle).toBe('solid');
            expect(style.outlineColor).not.toBe(style.backgroundColor);
            // The outline is the focus ring of the library, drawn outside the option
            expect(parseFloat(style.outlineOffset)).toBeGreaterThanOrEqual(0);
          });
        });

        test('skips options of a disabled group on arrow key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            options: partiallyDisabledGroupedOptions,
          });

          await component.getByRole('combobox').click();

          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option2');

          // The options of the disabled optgroup2 are skipped, so option2 stays active
          await page.keyboard.press('ArrowDown');
          await expectActiveOption(component, 'option2');

          await page.keyboard.press('End');
          await expectActiveOption(component, 'option2');
        });

        [
          ['first', 'ArrowDown', 'option1'],
          ['last', 'ArrowUp', 'option4'],
        ].forEach(([position, openKey, optionName]) => {
          test(`keeps the focus ring of the ${position} active option inside the dropdown`, async ({ mount }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              options: groupedOptions,
            });

            const combobox = component.getByRole('combobox');
            await combobox.focus();
            await combobox.press(openKey);
            await expectActiveOption(component, optionName);

            const isRingInside = await component.getByRole('option', { name: optionName }).evaluate((element) => {
              const style = getComputedStyle(element);
              const ring = parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset);
              const optionRect = element.getBoundingClientRect();
              const panel = element.closest('[role="listbox"]')!.parentElement!;
              const panelRect = panel.getBoundingClientRect();
              const panelTop = panelRect.top + panel.clientTop;
              const panelLeft = panelRect.left + panel.clientLeft;

              // The ring is drawn outside the option, so it must fit into the visible padding box of the
              // scrolling panel, otherwise it is clipped
              return optionRect.top - ring >= panelTop
                && optionRect.bottom + ring <= panelTop + panel.clientHeight
                && optionRect.left - ring >= panelLeft
                && optionRect.right + ring <= panelLeft + panel.clientWidth;
            });

            expect(isRingInside).toBe(true);
          });
        });
      });

      test.describe('tab stop', () => {
        test('does not include tags or their remove buttons in the tab order', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForFocusTests', {
            initialValue: ['value1', 'value2'],
          });

          await component.getByRole('combobox').first().focus();
          await page.keyboard.press('Tab');

          await expect(component.getByRole('combobox').last()).toBeFocused();
        });

        test('moves focus out of the field on Tab key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForFocusTests', {
            initialValue: ['value1', 'value2'],
          });

          await component.getByRole('combobox').first().focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('Tab');

          await expect(component.getByRole('combobox').last()).toBeFocused();
        });

        test('moves focus out of the field on Shift + Tab key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForFocusTests');

          await component.getByRole('combobox').last().focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option1' }).last()).toBeFocused();

          await page.keyboard.press('Shift+Tab');

          await expect(component.getByRole('combobox').first()).toBeFocused();
        });
      });

      test.describe('tags', () => {
        test('moves focus to the last tag on ArrowLeft key press with the caret at the start of the input', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('ArrowLeft');

          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();
        });

        test('does not move focus to a tag on ArrowLeft key press with the caret inside the search text', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.type('opt');
          await page.keyboard.press('ArrowLeft');

          await expect(combobox).toBeFocused();
          await expect.poll(() => combobox.evaluate(
            (input: HTMLInputElement) => input.selectionStart,
          )).toBe(2);
        });

        test('deactivates the active option instead of focusing a tag on ArrowLeft key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.type('opt');
          await page.keyboard.press('ArrowDown');
          await expect(combobox).toHaveAttribute('aria-activedescendant');

          await page.keyboard.press('ArrowLeft');

          await expect(combobox).toBeFocused();
          await expect(combobox).not.toHaveAttribute('aria-activedescendant');
        });

        test('does not move focus to a tag on Shift + ArrowLeft key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Shift+ArrowLeft');

          await expect(combobox).toBeFocused();
        });

        test('moves focus to the last tag on ArrowLeft key press when search is disabled', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('ArrowLeft');

          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();
        });

        test('moves between tags on ArrowLeft and ArrowRight key press without wrapping', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const firstTag = component.getByRole('gridcell', { name: 'option1' });
          const secondTag = component.getByRole('gridcell', { name: 'option2' });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('Backspace');
          await expect(secondTag).toBeFocused();

          await page.keyboard.press('ArrowLeft');
          await expect(firstTag).toBeFocused();

          // The first tag does not move further
          await page.keyboard.press('ArrowLeft');
          await expect(firstTag).toBeFocused();

          await page.keyboard.press('ArrowRight');
          await expect(secondTag).toBeFocused();
        });

        test('returns focus to the combobox on ArrowRight key press on the last tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('ArrowRight');

          await expect(combobox).toBeFocused();
          await expect.poll(() => combobox.evaluate(
            (input: HTMLInputElement) => input.selectionStart,
          )).toBe(0);
        });

        test('returns focus to the combobox on Escape key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('Escape');

          await expect(combobox).toBeFocused();
        });

        test('opens the dropdown and activates the first option on ArrowDown key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('ArrowDown');

          await expect(combobox).toBeFocused();
          await expect(combobox).toHaveAttribute('aria-expanded', 'true');
          const optionId = await component.getByRole('option', { name: 'option1' }).getAttribute('id');
          await expect(combobox).toHaveAttribute('aria-activedescendant', optionId!);
        });

        test('types into the input on a printable key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('o');

          await expect(combobox).toBeFocused();
          await expect(combobox).toHaveValue('o');
        });

        test('moves to the first and last tag on Home and End key press', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('Home');
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('End');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();
        });

        test('opens the dropdown and activates the last option on ArrowUp key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('ArrowUp');

          await expect(combobox).toBeFocused();
          await expect(combobox).toHaveAttribute('aria-expanded', 'true');
          const optionId = await component.getByRole('option', { name: 'option2' }).getAttribute('id');
          await expect(combobox).toHaveAttribute('aria-activedescendant', optionId!);
        });

        test('starts type-ahead on a printable key press on a focused tag when search is disabled', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('ArrowLeft');
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('o');

          await expect(combobox).toBeFocused();
          await expect(component.getByRole('listbox')).toBeVisible();
          const optionId = await component.getByRole('option', { name: 'option1' }).getAttribute('id');
          await expect(combobox).toHaveAttribute('aria-activedescendant', optionId!);
        });

        test('moves focus to the last tag on Backspace key press when search is disabled', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
            searchAlgorithm: null,
          });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('Backspace');

          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();
        });

        test('opens the dropdown instead of typing a space on Space key press on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1', 'value2'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

          await page.keyboard.press('Space');

          await expect(combobox).toBeFocused();
          await expect(combobox).toHaveValue('');
          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('places the cursor after the character typed on a focused tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Backspace');
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('o');
          await page.keyboard.press('p');

          await expect(combobox).toHaveValue('op');
          await expect.poll(() => combobox.evaluate((input: HTMLInputElement) => input.selectionStart)).toBe(2);
          await expect(component.getByRole('listbox')).toBeVisible();
        });

        test('removes a tag on clicking its remove button', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1'],
          });

          await component.getByRole('button', { name: 'Remove option1' }).click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([[]]);
          await expect(component.getByRole('gridcell', { name: 'option1' })).toHaveCount(0);
          // Clicking a tag must not open the dropdown, the focus moves to the combobox when no tags remain
          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(component.getByRole('combobox')).toBeFocused();
        });

        test('moves focus to the previous tag on removing a tag by clicking its remove button', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1', 'value2'],
          });

          await component.getByRole('button', { name: 'Remove option2' }).click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();
        });

        test('focuses the tag and closes the dropdown on clicking its label', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1'],
          });

          await component.getByRole('combobox').click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await component.getByRole('gridcell', { name: 'option1' }).getByText('option1').click();

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();
          await expect(component.getByRole('listbox')).toHaveCount(0);
        });

        test('does not focus a disabled tag on clicking its label', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            disabled: true,
            initialValue: ['value1'],
          });

          const tag = component.getByRole('gridcell', { name: 'option1' });
          await tag.getByText('option1').click();

          await expect(tag).not.toHaveAttribute('tabindex');
          await expect(tag).not.toBeFocused();
        });

        test('ignores Delete key press on a focused tag during IME composition', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1', 'value2'],
          });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('Backspace');
          const tag = component.getByRole('gridcell', { name: 'option2' });
          await expect(tag).toBeFocused();

          await tag.dispatchEvent('keydown', {
            isComposing: true,
            key: 'Delete',
          });

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([]);
          await expect(tag).toBeFocused();
        });

        ['Enter', 'Space'].forEach((removeKey) => {
          test(`removes a tag on ${removeKey} key press on its focused remove button`, async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
              initialValue: ['value1', 'value2'],
            });

            // The remove button is not in the tab order, it is focused by the pointer only
            const removeButton = component.getByRole('button', { name: 'Remove option2' });
            await removeButton.focus();
            await page.keyboard.press(removeKey);

            await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
            await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();
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
            await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();

            await page.keyboard.press(removeKey);

            await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value1']]);
            // Focus moves to the previous tag
            await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();
          });
        });

        test('moves focus to the next tag on removing the first tag', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldSpyForTest', {
            initialValue: ['value1', 'value2'],
          });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('Backspace');
          await page.keyboard.press('Home');
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeFocused();

          await page.keyboard.press('Delete');

          await expect.poll(() => component.getSpyValue('onChange')).toEqual([['value2']]);
          // There is no previous tag, focus moves to the next one
          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();
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

          await expect(component.getByRole('gridcell', { name: 'option2' })).toBeFocused();
        });

        test('indicates a focused tag with the focus ring', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1'],
          });

          await component.getByRole('combobox').focus();
          await page.keyboard.press('Backspace');

          const tag = component.getByRole('gridcell', { name: 'option1' });
          await expect(tag).toBeFocused();

          const style = await tag.evaluate((element) => {
            const computedStyle = getComputedStyle(element);

            return {
              outlineOffset: computedStyle.outlineOffset,
              outlineStyle: computedStyle.outlineStyle,
              outlineWidth: computedStyle.outlineWidth,
            };
          });

          // The tag shows the focus ring of the library, not the default outline of the browser
          expect(style.outlineStyle).toBe('solid');
          expect(parseFloat(style.outlineWidth)).toBeGreaterThan(0);
          expect(parseFloat(style.outlineOffset)).toBeGreaterThanOrEqual(0);
        });

        test('does not move focus to a tag on Backspace key press with a modifier', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            initialValue: ['value1'],
          });

          const combobox = component.getByRole('combobox');
          await combobox.focus();
          await page.keyboard.press('Alt+Backspace');

          await expect(combobox).toBeFocused();
          await expect(component.getByRole('gridcell', { name: 'option1' })).toBeAttached();
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
          // A listbox may only contain options and groups, and the combobox is not expanded without a listbox
          await expect(component.getByRole('listbox')).toHaveCount(0);
          await expect(component.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
          await expect(component.getByRole('combobox')).not.toHaveAttribute('aria-controls');
        });

        test('announces no matching options through a live region', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          await component.getByRole('combobox').click();

          // The live region must exist before its content changes to be announced reliably
          const status = component.getByRole('status');
          await expect(status).toBeAttached();
          await expect(status).toHaveAttribute('aria-live', 'polite');
          await expect(status).toHaveText('');

          await page.keyboard.type('nonexistent');

          await expect(status).toHaveText('No options');
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

        test('renders a non-editable combobox when search is disabled', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          const combobox = component.getByRole('combobox');
          await expect(combobox).toHaveAccessibleName('test-label');
          await expect(combobox).toHaveAttribute('tabindex', '0');
          await expect(combobox).not.toHaveAttribute('aria-autocomplete');
          expect(await combobox.evaluate((element) => element.tagName)).toBe('DIV');

          await combobox.click();
          await expect(component.getByRole('listbox')).toBeVisible();

          await page.keyboard.type('option2');
          await expect(component.getByRole('option')).toHaveCount(2);
        });

        test.describe('type-ahead when search is disabled', () => {
          const expectActiveOptionName = async (component: MountResult, name: string) => {
            const optionId = await component.getByRole('option', { name }).getAttribute('id');
            await expect(component.getByRole('combobox')).toHaveAttribute('aria-activedescendant', optionId!);
          };

          test('opens dropdown and activates the option matching typed characters', async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              searchAlgorithm: null,
            });

            await component.getByRole('combobox').focus();
            await page.keyboard.type('option2');

            await expect(component.getByRole('listbox')).toBeVisible();
            await expectActiveOptionName(component, 'option2');
          });

          test('cycles through options starting with a repeated character', async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              searchAlgorithm: null,
            });

            await component.getByRole('combobox').focus();
            await page.keyboard.press('o');
            await expectActiveOptionName(component, 'option1');

            await page.keyboard.press('o');
            await expectActiveOptionName(component, 'option2');

            await page.keyboard.press('o');
            await expectActiveOptionName(component, 'option1');
          });

          test('keeps the active option while the typed characters still match its label', async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              searchAlgorithm: null,
            });

            await component.getByRole('combobox').focus();
            await page.keyboard.press('o');
            await expectActiveOptionName(component, 'option1');

            // "op" still matches option1, so it is not skipped for the next option starting with "o"
            await page.keyboard.press('p');
            await expectActiveOptionName(component, 'option1');
          });

          test('continues a multi-word search with Space key press', async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              options: [
                {
                  label: 'New York',
                  value: 'ny',
                },
                {
                  label: 'New Zealand',
                  value: 'nz',
                },
              ],
              searchAlgorithm: null,
            });

            await component.getByRole('combobox').focus();
            await page.keyboard.type('new z');

            await expect(component.getByRole('listbox')).toBeVisible();
            await expectActiveOptionName(component, 'New Zealand');
          });

          test('starts a new search after a pause in typing', async ({
            mount,
            page,
          }) => {
            const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
              searchAlgorithm: null,
            });

            await component.getByRole('combobox').focus();
            await page.keyboard.type('option2');
            await expectActiveOptionName(component, 'option2');

            // The typed characters are forgotten after 500 ms, so "o" searches again from the next option
            await page.waitForTimeout(600);
            await page.keyboard.press('o');
            await expectActiveOptionName(component, 'option1');
          });

          [
            ['Home', 'option1'],
            ['End', 'option2'],
          ].forEach(([key, optionName]) => {
            test(`opens dropdown and activates ${optionName} on ${key} key press`, async ({
              mount,
              page,
            }) => {
              const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
                searchAlgorithm: null,
              });

              await component.getByRole('combobox').focus();
              await page.keyboard.press(key);

              await expect(component.getByRole('listbox')).toBeVisible();
              await expectActiveOptionName(component, optionName);
            });
          });
        });

        test('focuses the combobox on clicking the label when search is disabled', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          await component.getByText('test-label').click();

          await expect(component.getByRole('combobox')).toBeFocused();
        });

        test('takes the disabled combobox out of the tab order when search is disabled', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            disabled: true,
            searchAlgorithm: null,
          });

          const combobox = component.getByRole('combobox');
          await expect(combobox).toHaveAttribute('aria-disabled', 'true');
          await expect(combobox).not.toHaveAttribute('tabindex');
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

        test('focuses the combobox on removing the last tag when search is disabled', async ({ mount }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest', {
            searchAlgorithm: null,
          });

          await component.getByRole('button', { name: 'Remove option1' }).click();

          await expect(component.getByRole('button')).toHaveCount(0);
          await expect(component.getByRole('combobox')).toBeFocused();
        });

        test('clears the active option on typing into the search input', async ({
          mount,
          page,
        }) => {
          const component = await mount('MultiSelectField/MultiSelectFieldForTest');

          const combobox = component.getByRole('combobox');
          await combobox.click();
          await page.keyboard.press('ArrowDown');
          await expect(combobox).toHaveAttribute('aria-activedescendant');

          await page.keyboard.type('o');

          await expect(combobox).not.toHaveAttribute('aria-activedescendant');
          await expect(component.getByRole('listbox')).toBeVisible();
        });
      });
    });
  });

  test.describe('inputGroup', () => {
    test.describe('visual', () => {
      [
        ...propTests.disabledPropTest,
        ...propTests.sizePropTest,
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

          const component = await mount('MultiSelectField/MultiSelectFieldForInputGroupTests', props);

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot({ animations: 'disabled' });
          expect(screenshot).toMatchSnapshot();
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
