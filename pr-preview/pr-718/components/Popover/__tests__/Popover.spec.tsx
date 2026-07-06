import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import {
  PopoverForRefTest,
  PopoverForTest,
  PopoverWithTargetIdForTest,
} from './Popover.story';
import { placementPropTest } from './_propTests/placementPropTest';
import { popoverTargetIdPropTest } from './_propTests/popoverTargetIdPropTest';

test.describe('Popover', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...placementPropTest,
      ...popoverTargetIdPropTest,
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

        const hasTargetId = props?.popoverTargetId !== undefined;

        const component = hasTargetId
          ? await mount(
            <PopoverWithTargetIdForTest
              {...props}
            />,
          )
          : await mount(
            <PopoverForTest
              {...props}
            />,
          );

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
      const id = 'custom-id';
      const childrenText = 'Some text';

      const component = await mount(
        <PopoverForTest id={id}>
          {childrenText}
        </PopoverForTest>,
      );

      await expect(component.getByText(childrenText)).toHaveAttribute('id', id);
    });

    test('ref', async ({ mount }) => {
      const childrenText = 'Some text';

      const component = await mount(
        <PopoverForRefTest
          testRefAttrName="test-ref"
          testRefAttrValue="test-ref-value"
        >
          {childrenText}
        </PopoverForRefTest>,
      );

      await expect(component.getByText(childrenText)).toHaveAttribute('test-ref', 'test-ref-value');
    });
  });

  test.describe('functionality', () => {
    test('render in portal when portalId defined', async ({
      mount,
      page,
    }) => {
      const portalId = 'portal-id';
      const portalContent = 'portal content';

      await page.evaluate(() => {
        document.body.innerHTML += '<div id="portal-id" />';
      });

      await mount(
        <PopoverForTest portalId={portalId}>
          {portalContent}
        </PopoverForTest>,
      );

      const portalHTMLContent = await page
        .evaluate((id) => document.getElementById(id).innerHTML, portalId);

      expect(portalHTMLContent).toContain(portalContent);
    });

    test('pass placementStyle into style property', async ({ mount }) => {
      const content = 'content';
      const insetPlacementStyle = {
        inset: '10px',
        'inset-block-end': 'auto',
        'inset-block-start': 'auto',
        'inset-inline-end': 'auto',
        'inset-inline-start': 'auto',
        position: 'absolute',
        'transform-origin': 'center',
        translate: '10px',
      };

      const positionStyleObject1 = {
        left: '10px',
        top: '10px',
      };

      const positionStyleObject2 = {
        bottom: '10px',
        right: '10px',
      };

      const insetStyleComponent = await mount(
        <PopoverForTest placementStyle={insetPlacementStyle}>
          {content}
        </PopoverForTest>,
      );

      const insetPopover = insetStyleComponent.getByText(content);
      const insetStyle = await insetPopover.getAttribute('style');

      expect(insetStyle).toContain('position: absolute;');
      expect(insetStyle).toContain('inset: 10px;');
      expect(insetStyle).toContain('inset-inline: auto;');
      expect(insetStyle).toContain('translate: 10px;');
      expect(insetStyle).toContain('transform-origin: center center;');

      await insetStyleComponent.unmount();

      const positionComponent1 = await mount(
        <PopoverForTest placementStyle={positionStyleObject1}>
          {content}
        </PopoverForTest>,
      );

      const positionPopover1 = positionComponent1.getByText(content);
      const positionStyle1 = await positionPopover1.getAttribute('style');

      expect(positionStyle1).toContain('top: 10px;');
      expect(positionStyle1).toContain('left: 10px;');

      await positionComponent1.unmount();

      const positionComponent2 = await mount(
        <PopoverForTest placementStyle={positionStyleObject2}>
          {content}
        </PopoverForTest>,
      );

      const positionPopover2 = positionComponent2.getByText(content);
      const positionStyle2 = await positionPopover2.getAttribute('style');

      expect(positionStyle2).toContain('right: 10px;');
      expect(positionStyle2).toContain('bottom: 10px;');
    });
  });
});
