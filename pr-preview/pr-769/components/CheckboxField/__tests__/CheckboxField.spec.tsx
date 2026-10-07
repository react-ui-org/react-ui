import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';

test.describe('CheckboxField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.helpTextAndValidationTextPropType,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPositionPropTest,
        ...propTests.labelPropTest,
        ...propTests.renderAsRequiredPropTest,
        ...mixPropTests([
          propTests.disabledPropTest,
          propTests.checkedPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.checkedPropTest,
          propTests.requiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.checkedPropTest,
          propTests.renderAsRequiredPropTest,
          propTests.validationStatePropTest,
        ]),
        ...mixPropTests([
          propTests.checkedPropTest,
          propTests.requiredPropTest,
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

          const component = await mount('CheckboxField/CheckboxFieldForTest', props);

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
        const idValue = 'checkbox-id';
        const label = 'checkbox-label';
        const helpText = 'checkbox-helpText';
        const validationText = 'checkbox-validationText';

        const component = await mount('CheckboxField/CheckboxFieldForTest', {
          helpText,
          id: idValue,
          label,
          validationText,
        });

        await expect(component.getByRole('checkbox')).toHaveAttribute('id', idValue);
        await expect(component).toHaveAttribute('id', `${idValue}__label`);
        await expect(component.getByText(label)).toHaveAttribute('id', `${idValue}__labelText`);
        await expect(component.getByText(helpText)).toHaveAttribute('id', `${idValue}__helpText`);
        await expect(component.getByText(validationText)).toHaveAttribute('id', `${idValue}__validationText`);
      });

      test('ref', async ({ mount }) => {
        const component = await mount('CheckboxField/CheckboxFieldForRefTest', {
          testRefAttrName: 'test-ref',
          testRefAttrValue: 'test-ref-value',
        });

        await expect(component.getByRole('checkbox')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange()', async ({ mount }) => {
        const component = await mount('CheckboxField/CheckboxFieldSpyForTest');

        await component.getByRole('checkbox').click({ force: true });
        await expect.poll(() => component.getSpyValue('onChange')).toContain(true);
      });

      test('check on space press when focused', async ({ mount }) => {
        const component = await mount('CheckboxField/CheckboxFieldForTest');

        const input = component.getByRole('checkbox');
        await input.focus();
        await input.press('Space');
        await expect(input).toBeChecked();
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      test('labelWidth:string=100px', async ({ mount }) => {
        const component = await mount('CheckboxField/CheckboxForFormLayoutLabelWidthTests');

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

          const component = await mount('CheckboxField/CheckboxForFormLayoutTests', props);

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
