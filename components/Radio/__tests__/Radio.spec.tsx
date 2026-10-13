import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';
import { partialDisabledOptionsPropTest } from './_propTests/partialDisabledOptionsPropTest';

const options = [
  {
    disabled: false,
    key: 'customKey1',
    label: 'customLabel1',
    value: 'customValue1',
  },
  {
    disabled: false,
    key: 'customKey2',
    label: 'customLabel2',
    value: 'customValue2',
  },
  {
    disabled: false,
    label: 'customLabel3',
    value: 'customValue3',
  },
];

test.describe('Radio', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.helpTextAndValidationTextPropType,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPropTest,
        ...propTests.layoutPropTest,
        ...propTests.renderAsRequiredPropTest,
        ...propTests.requiredPropTest,
        ...mixPropTests([
          propTests.disabledPropTest,
          propTests.validationStatePropTest,
          propTests.validationTextPropTest,
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
          partialDisabledOptionsPropTest,
          propTests.validationStatePropTest,
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

          const component = await mount('Radio/RadioForTest', props);

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
        const radioId = 'radioId';
        const label = 'radioLabel';

        const component = await mount('Radio/RadioForTest', {
          id: radioId,
          label,
          options,
        });

        await expect(component).toHaveAttribute('id', radioId);
        await expect(component.getByText(label).first()).toHaveAttribute('id', `${radioId}__label`);
        await expect(component.getByText(label).last()).toHaveAttribute('id', `${radioId}__displayLabel`);
        await expect(component.getByText(options[0].label)).toHaveAttribute('id', `${radioId}__item__${options[0].key}__labelText`);
        await expect(component.getByText(options[1].label)).toHaveAttribute('id', `${radioId}__item__${options[1].key}__labelText`);
        await expect(component.getByText(options[2].label)).toHaveAttribute('id', `${radioId}__item__${options[2].value}__labelText`);
        await expect(component.locator(`input[id=${radioId}__item__${options[0].key}]`)).not.toBeEmpty();
        await expect(component.locator(`input[id=${radioId}__item__${options[1].key}]`)).not.toBeEmpty();
        await expect(component.locator(`input[id=${radioId}__item__${options[2].value}]`)).not.toBeEmpty();
        await expect(component.locator(`label[id=${radioId}__item__${options[0].key}__label]`)).not.toBeEmpty();
        await expect(component.locator(`label[id=${radioId}__item__${options[1].key}__label]`)).not.toBeEmpty();
        await expect(component.locator(`label[id=${radioId}__item__${options[2].value}__label]`)).not.toBeEmpty();
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange()', async ({ mount }) => {
        const component = await mount('Radio/RadioSpyForTest', {
          options,
        });

        await component.getByText(options[1].label).click({ force: true });
        await expect.poll(() => component.getSpyValue('onChange')).toContain(true);
      });
      test('check on space press when focused', async ({ mount }) => {
        const testId = 'testId';

        const component = await mount('Radio/RadioSpyForTest', {
          id: testId,
          options,
        });

        const input = component.locator(`input[id=${testId}__item__${options[1].key}]`);
        await input.focus();
        await input.press('Space');
        await expect.poll(() => component.getSpyValue('onChange')).toContain(true);
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      test('labelWidth:string=100px', async ({ mount }) => {
        const component = await mount('Radio/RadioForFormLayoutLabelWidthTests');

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });

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

          const component = await mount('Radio/RadioForFormLayoutTests', props);

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
