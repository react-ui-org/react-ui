import {
  expect,
  propTests,
  test,
} from '../../../../tests/playwright';

test.describe('TextLink', () => {
  const testHref = '/test/custom/uri';

  test.describe('visual', () => {
    [
      ...propTests.labelPropTest,
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

        const component = await mount('TextLink/TextLinkForTest', props);

        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('href', async ({ mount }) => {
      const component = await mount('TextLink/TextLinkForTest', {
        href: testHref,
      });

      await expect(component).toHaveAttribute('href', testHref);
    });
  });

  test.describe('functionality', () => {
    test('calls native redirect when clicked on', async ({ mount }) => {
      const component = await mount('TextLink/TextLinkForTest', {
        href: testHref,
      });
      const page = component.page();

      await Promise.all([
        page.waitForURL(testHref),
        component.click(),
      ]);

      expect(page.url()).toContain(testHref);
    });

    test('calls native redirect when Enter pressed', async ({ mount }) => {
      const component = await mount('TextLink/TextLinkForTest', {
        href: testHref,
      });
      const page = component.page();

      await Promise.all([
        page.waitForURL(testHref),
        component.press('Enter'),
      ]);

      expect(page.url()).toContain(testHref);
    });

    test('calls onClick when clicked', async ({ mount }) => {
      const component = await mount('TextLink/TextLinkSpyForTest');
      await component.getByRole('link').click();

      await expect.poll(() => component.getSpyValue('onClick')).toContain(true);
    });

    test('calls onClick when Enter pressed', async ({ mount }) => {
      const component = await mount('TextLink/TextLinkSpyForTest');
      await component.getByRole('link').press('Enter');

      await expect.poll(() => component.getSpyValue('onClick')).toContain(true);
    });
  });
});
