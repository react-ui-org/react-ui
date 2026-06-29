import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  ModalWithInputsForTest,
  ModalForTest,
  ModalWithPartiallyDisabledInputsForTest,
  ModalWithButtonsAndWithoutInputsForTest,
} from './Modal.story';
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

        const component = await mount(
          <ModalForTest
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
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const testId = 'testId';

      const component = await mount(
        <div>
          <ModalForTest id={testId} />
        </div>,
      );

      await expect(component.locator('dialog')).toHaveAttribute('id', testId);
    });
  });

  test.describe('functionality', () => {
    test.describe('allowCloseOnEscapeKey', () => {
      test('close on esc key press when enabled', async ({ mount }) => {
        let called = false;

        const component = await mount(
          <ModalWithInputsForTest
            allowCloseOnEscapeKey
            closeButtonOnClick={() => {
              called = true;
            }}
          />,
        );

        const dialog = component.locator('dialog');
        await dialog.focus();
        await dialog.press('Escape');
        expect(called).toBe(true);
      });

      test('do not close on esc key press when disabled', async ({ mount }) => {
        let called = false;

        const component = await mount(
          <ModalWithInputsForTest
            allowCloseOnEscapeKey={false}
            closeButtonOnClick={() => {
              called = true;
            }}
          />,
        );

        const dialog = component.locator('dialog');
        await dialog.focus();
        await dialog.press('Escape');
        expect(called).toBe(false);
      });
    });

    test.describe('allowPrimaryActionOnEnterKey', () => {
      test('call primary action on enter key press when input/select content focused', async ({ mount }) => {
        let called = false;

        const component = await mount(
          <ModalWithInputsForTest
            allowPrimaryActionOnEnterKey
            primaryButtonOnClick={() => {
              called = true;
            }}
          />,
        );

        const input = component.locator('input[name="input1"]');
        await input.focus();
        await input.press('Enter');
        expect(called).toBe(true);
      });

      test('do not call primary action on enter key press when is disabled', async ({ mount }) => {
        let called = false;

        const component = await mount(
          <ModalWithInputsForTest
            allowPrimaryActionOnEnterKey={false}
            primaryButtonOnClick={() => {
              called = true;
            }}
          />,
        );

        const input = component.locator('input[name="input1"]');
        await input.focus();
        await input.press('Enter');
        expect(called).toBe(false);
      });
    });

    test.describe('autoFocus', () => {
      test('focus first input element when enabled', async ({ mount }) => {
        const component = await mount(
          <ModalWithInputsForTest autoFocus />,
        );

        const input = component.locator('input[name="input1"]');
        await expect(input).toBeFocused();
      });

      test('focus first non disabled input element when enabled', async ({ mount }) => {
        const component = await mount(
          <ModalWithPartiallyDisabledInputsForTest autoFocus />,
        );

        const input = component.locator('input[name="input2"]');
        await expect(input).toBeFocused();
      });

      test('focus primary button when no input content and autoFocus is enabled', async ({ mount }) => {
        const component = await mount(
          <ModalWithButtonsAndWithoutInputsForTest autoFocus />,
        );

        const button = component.getByText('Primary button');
        await expect(button).toBeFocused();
      });

      test('focus modal itself, when no focusable element and autoFocus enabled', async ({ mount }) => {
        const component = await mount(
          <ModalForTest autoFocus />,
        );

        const dialog = component.locator('dialog');
        await expect(dialog).toBeFocused();
      });

      test('no focused element when disabled', async ({ mount }) => {
        const component = await mount(
          <ModalWithInputsForTest autoFocus={false} />,
        );

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
        let called = false;

        const component = await mount(
          <ModalWithInputsForTest
            allowCloseOnBackdropClick
            closeButtonOnClick={() => {
              called = true;
            }}
          />,
        );

        const dialog = component.locator('dialog');
        const box = await dialog.evaluate((element) => element.getBoundingClientRect());
        await page.mouse.click(box.x - 50, box.y - 50);
        await page.waitForTimeout(2000);
        expect(called).toBe(true);
      });

      test('do not close on backdrop click when disabled', async ({
        mount,
        page,
      }) => {
        let called = false;

        const component = await mount(
          <div>
            <ModalWithInputsForTest
              allowCloseOnBackdropClick={false}
              closeButtonOnClick={() => {
                called = true;
              }}
            />
          </div>,
        );

        const dialog = component.locator('dialog');
        const box = await dialog.evaluate((element) => element.getBoundingClientRect());
        await page.mouse.click(box.x - 50, box.y - 50);
        expect(called).toBe(false);
      });
    });

    test.describe('portalId', () => {
      test('render in portal when defined', async ({
        mount,
        page,
      }) => {
        const portalId = 'portal-id';

        await page.evaluate(() => {
          document.body.innerHTML += '<div id="portal-id" />';
        });

        await mount(
          <ModalForTest portalId={portalId} />,
        );

        const portalHTMLContent = await page
          .evaluate((id) => document.getElementById(id).innerHTML, portalId);

        expect(portalHTMLContent).toContain('dialog');
      });
    });
  });
});
