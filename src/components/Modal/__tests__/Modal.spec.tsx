import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  ModalForCallbackTest,
  ModalForTest,
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
    test('close on esc key press when allowCloseOnEscapeKey enabled', async ({ mount }) => {
      let called = false;

      const component = await mount(
        <ModalForCallbackTest
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

    test('do not close on esc key press when allowCloseOnEscapeKey disabled', async ({ mount }) => {
      let called = false;

      const component = await mount(
        <ModalForCallbackTest
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

    test('call primary action on enter key press when input/select content focused', async ({ mount }) => {
      let called = false;

      const component = await mount(
        <ModalForCallbackTest
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

    test('do not call primary action on enter key press when allowPrimaryActionOnEnterKey is disabled', async ({ mount }) => {
      let called = false;

      const component = await mount(
        <ModalForCallbackTest
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

    test('focus first input element when autoFocus enabled', async ({ mount }) => {
      const component = await mount(
        <ModalForCallbackTest autoFocus />,
      );

      const input = component.locator('input[name="input1"]');
      await expect(input).toBeFocused();
    });

    test('no focused element when autoFocus disabled', async ({ mount }) => {
      const component = await mount(
        <ModalForCallbackTest autoFocus={false} />,
      );

      const promises: Promise<void>[] = [];
      const inputs = await component.locator('input').all();
      const buttons = await component.locator('button').all();

      inputs.forEach((input) => promises.push(expect(input).not.toBeFocused()));
      buttons.forEach((button) => promises.push(expect(button).not.toBeFocused()));

      await Promise.allSettled(promises);
    });

    test('close on backdrop click when allowCloseOnBackdropClick enabled', async ({
      mount,
      page,
    }) => {
      let called = false;

      const component = await mount(
        <ModalForCallbackTest
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

    test('do not close on backdrop click when allowCloseOnBackdropClick disabled', async ({
      mount,
      page,
    }) => {
      let called = false;

      const component = await mount(
        <div>
          <ModalForCallbackTest
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

    test('render in portal when portalId defined', async ({
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
