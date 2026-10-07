import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';

test.describe('Toggle', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...propTests.helpTextAndValidationTextPropType,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPositionPropTest,
        ...propTests.labelPropTest,
        ...propTests.renderAsRequiredPropTest,
        ...propTests.requiredPropTest,
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
          propTests.disabledPropTest,
          propTests.checkedPropTest,
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

          const component = await mount('Toggle/ToggleForTest', props);

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
        const testId = 'testId';
        const testLabel = 'testLabel';
        const testHelpText = 'testHelpText';
        const testValidationText = 'testValidationText';

        const component = await mount('Toggle/ToggleForTest', {
          helpText: testHelpText,
          id: testId,
          label: testLabel,
          validationText: testValidationText,
        });

        await expect(component).toHaveAttribute('id', `${testId}__label`);
        await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
        await expect(component.getByText(testHelpText)).toHaveAttribute('id', `${testId}__helpText`);
        await expect(component.getByText(testValidationText)).toHaveAttribute('id', `${testId}__validationText`);
        await expect(component.getByRole('checkbox')).toHaveAttribute('id', testId);
      });

      test('ref', async ({ mount }) => {
        const component = await mount('Toggle/ToggleForRefTest', {
          testRefAttrName: 'test-ref',
          testRefAttrValue: 'test-ref-value',
        });

        await expect(component.getByRole('checkbox')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('calls synthetic event onChange() on toggling', async ({ mount }) => {
        const component = await mount('Toggle/ToggleSpyForTest');

        await component.getByRole('checkbox').click({ force: true });
        await expect.poll(() => component.getSpyValue('onChange')).toContain(true);
      });

      test('toggle on space press', async ({ mount }) => {
        const component = await mount('Toggle/ToggleSpyForTest');

        const input = component.getByRole('checkbox');
        await input.focus();
        await input.press('Space');
        await expect.poll(() => component.getSpyValue('onChange')).toContain(true);
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      test('labelWidth:string=100px', async ({ mount }) => {
        const component = await mount('Toggle/ToggleForFormLayoutLabelWidthTests');

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

          const component = await mount('Toggle/ToggleForFormLayoutTests', props);

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
