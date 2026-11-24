import {
  expect,
  propTests,
  test,
} from '../../../../tests/playwright';
import { positionPropTest } from './_propTests/Modal/positionPropTest';
import { sizePropTest } from './_propTests/Modal/sizePropTest';

test.describe('Modal', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.feedbackColorPropTest,
      ...positionPropTest,
      ...sizePropTest,
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

        const component = await mount('Modal/ModalForTest', props);

        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot({ animations: 'disabled' });
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({
      mount,
      page,
    }) => {
      const testId = 'testId';

      await mount('Modal/ModalForTest', {
        id: testId,
      });

      await expect(page.locator('dialog')).toHaveAttribute('id', testId);
    });
  });

  test.describe('functionality', () => {
    test.describe('allowCloseOnEscapeKey', () => {
      test('close on esc key press when enabled', async ({ mount }) => {
        const component = await mount('Modal/ModalWithInputsSpyForTest', {
          allowCloseOnEscapeKey: true,
        });

        const dialog = component.locator('dialog');
        await dialog.focus();
        await dialog.press('Escape');
        await expect.poll(() => component.getSpyValue('closeButtonOnClick')).toContain(true);
      });

      test('do not close on esc key press when disabled', async ({ mount }) => {
        const component = await mount('Modal/ModalWithInputsSpyForTest', {
          allowCloseOnEscapeKey: false,
        });

        const dialog = component.locator('dialog');
        await dialog.focus();
        await dialog.press('Escape');
        await expect.poll(() => component.getSpyValue('closeButtonOnClick')).toEqual([]);
      });
    });

    test.describe('allowPrimaryActionOnEnterKey', () => {
      test('call primary action on enter key press when input/select content focused', async ({ mount }) => {
        const component = await mount('Modal/ModalWithInputsSpyForTest', {
          allowPrimaryActionOnEnterKey: true,
        });

        const input = component.locator('input[name="input1"]');
        await input.focus();
        await input.press('Enter');
        await expect.poll(() => component.getSpyValue('primaryButtonOnClick')).toContain(true);
      });

      test('do not call primary action on enter key press when is disabled', async ({ mount }) => {
        const component = await mount('Modal/ModalWithInputsSpyForTest', {
          allowPrimaryActionOnEnterKey: false,
        });

        const input = component.locator('input[name="input1"]');
        await input.focus();
        await input.press('Enter');
        await expect.poll(() => component.getSpyValue('primaryButtonOnClick')).toEqual([]);
      });
    });

    test.describe('autoFocus', () => {
      test('focus first input element when enabled', async ({ mount }) => {
        const component = await mount('Modal/ModalWithInputsForTest', {
          autoFocus: true,
        });

        const input = component.locator('input[name="input1"]');
        await expect(input).toBeFocused();
      });

      test('focus first non disabled input element when enabled', async ({ mount }) => {
        const component = await mount('Modal/ModalWithPartiallyDisabledInputsForTest', {
          autoFocus: true,
        });

        const input = component.locator('input[name="input2"]');
        await expect(input).toBeFocused();
      });

      test('focus primary button when no input content and autoFocus is enabled', async ({ mount }) => {
        const component = await mount('Modal/ModalWithButtonsAndWithoutInputsForTest', {
          autoFocus: true,
        });

        const button = component.getByText('Primary button');
        await expect(button).toBeFocused();
      });

      test('focus modal itself, when no focusable element and autoFocus enabled', async ({ mount }) => {
        const component = await mount('Modal/ModalForTest', {
          autoFocus: true,
        });

        const dialog = component.locator('dialog');
        await expect(dialog).toBeFocused();
      });

      test('no focused element when disabled', async ({ mount }) => {
        const component = await mount('Modal/ModalWithInputsForTest', {
          autoFocus: false,
        });

        const promises: Promise<void>[] = [];
        const inputs = await component.locator('input').all();
        const buttons = await component.locator('button').all();

        inputs.forEach((input) => promises.push(expect(input).not.toBeFocused()));
        buttons.forEach((button) => promises.push(expect(button).not.toBeFocused()));

        await Promise.allSettled(promises);
      });
    });

    test.describe('allowCloseOnBackdropClick', () => {
      test('close on backdrop click when enabled', async ({
        mount,
        page,
      }) => {
        const component = await mount('Modal/ModalWithInputsSpyForTest', {
          allowCloseOnBackdropClick: true,
        });

        const dialog = component.locator('dialog');
        const box = await dialog.evaluate((element) => element.getBoundingClientRect());
        await page.mouse.click(box.x - 50, box.y - 50);
        await page.waitForTimeout(2000);
        await expect.poll(() => component.getSpyValue('closeButtonOnClick')).toContain(true);
      });

      test('do not close on backdrop click when disabled', async ({
        mount,
        page,
      }) => {
        const component = await mount('Modal/ModalWithInputsSpyForTest', {
          allowCloseOnBackdropClick: false,
        });

        const dialog = component.locator('dialog');
        const box = await dialog.evaluate((element) => element.getBoundingClientRect());
        await page.mouse.click(box.x - 50, box.y - 50);
        await expect.poll(() => component.getSpyValue('closeButtonOnClick')).toEqual([]);
      });
    });

    test.describe('portalId', () => {
      test('render in portal when defined', async ({
        mount,
        page,
      }) => {
        const portalId = 'portal-id';

        const component = await mount('Modal/ModalForTest');

        // `mount()` reloads the page, so the portal is added after it and the story is re-rendered into it
        await page.evaluate((id) => {
          document.body.insertAdjacentHTML('beforeend', `<div id="${id}"></div>`);
        }, portalId);

        await component.update({
          portalId,
        });

        const portalHTMLContent = await page
          .evaluate((id) => document.getElementById(id)?.innerHTML, portalId);

        expect(portalHTMLContent).toContain('dialog');
      });
    });
  });
});
