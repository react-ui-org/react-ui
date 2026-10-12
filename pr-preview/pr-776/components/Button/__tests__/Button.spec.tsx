import {
  element,
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';

test.describe('Button', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.afterLabelPropTest,
      ...propTests.beforeLabelPropTest,
      ...propTests.blockPropTest,
      ...propTests.endCornerPropTest,
      ...propTests.feedbackIconPropTest,
      ...propTests.labelPropTest,
      ...propTests.labelVisibilityPropTest,
      ...propTests.sizePropTest,
      ...propTests.startCornerPropTest,
      ...mixPropTests([
        [
          ...propTests.actionColorPropTest,
          ...propTests.feedbackColorPropTest,
          ...propTests.neutralColorPropTest,
        ],
        propTests.disabledPropTest,
        propTests.priorityPropTest,
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

        const component = await mount('Button/ButtonForTest', props);

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

      const component = await mount('Button/ButtonForTest', {
        id: testId,
        label: testLabel,
      });

      await expect(component).toHaveAttribute('id', testId);
      await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
    });

    test('ref', async ({ mount }) => {
      const component = await mount('Button/ButtonForRefTest', {
        testRefAttrName: 'test-ref',
        testRefAttrValue: 'test-ref-value',
      });

      await expect(component).toHaveAttribute('test-ref', 'test-ref-value');
    });
  });

  test.describe('functionality', () => {
    test('calls onClick when clicked', async ({ mount }) => {
      const component = await mount('Button/ButtonSpyForTest');
      await component.getByRole('button').click();

      await expect.poll(() => component.getSpyValue('onClick')).toContain(true);
    });

    test('calls onClick when Enter pressed', async ({ mount }) => {
      const component = await mount('Button/ButtonSpyForTest');
      await component.getByRole('button').press('Enter');

      await expect.poll(() => component.getSpyValue('onClick')).toContain(true);
    });

    test('is disabled when disabled is set', async ({ mount }) => {
      const component = await mount('Button/ButtonSpyForTest', {
        disabled: true,
      });
      const button = component.getByRole('button');
      await button.click({ force: true });

      await expect(button).toBeDisabled();
      await expect.poll(() => component.getSpyValue('onClick')).toEqual([]);
    });

    test('is disabled when feedbackIcon is set', async ({ mount }) => {
      const component = await mount('Button/ButtonSpyForTest', {
        feedbackIcon: element('span', { children: 'Placeholder' }),
      });
      const button = component.getByRole('button');
      await button.click({ force: true });

      await expect(button).toBeDisabled();
      await expect.poll(() => component.getSpyValue('onClick')).toEqual([]);
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      test('vertical', async ({ mount }) => {
        const component = await mount('Button/ButtonInVerticalFormLayoutForTest');
        expect(await component.screenshot()).toMatchSnapshot();
      });

      test('horizontal', async ({ mount }) => {
        const component = await mount('Button/ButtonInHorizontalFormLayoutForTest');
        expect(await component.screenshot()).toMatchSnapshot();
      });
    });
  });
});
