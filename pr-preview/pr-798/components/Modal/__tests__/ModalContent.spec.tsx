import {
  expect,
  propTests,
  test,
} from '../../../../tests/playwright';
import { contentPropTest } from './_propTests/contentPropTest';

test.describe('ModalContent', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.feedbackColorPropTest,
      ...contentPropTest,
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

        const component = await mount('ModalContent/ModalContentForTest', props);

        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot({ animations: 'disabled' });
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const testId = 'testId';

      const component = await mount('ModalContent/ModalContentForTest', {
        children: 'Content',
        id: testId,
      });

      expect(component.locator(`div[id="${testId}"]`)).toBeDefined();
    });
  });

  test.describe('functionality', () => {
    test('render null when no children provided', async ({ mount }) => {
      const component = await mount('ModalContent/ModalContentWithoutChildrenForTest', {
        children: null,
      });

      const modalBodyContent = await component.evaluate((element) => {
        const modalBody = element.querySelector('#modalBodyId');
        return modalBody?.textContent;
      });
      expect(modalBodyContent).toBe('');
    });
  });
});
