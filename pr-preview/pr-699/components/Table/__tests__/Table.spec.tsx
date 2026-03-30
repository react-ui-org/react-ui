import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import { TableForTest } from './Table.story';
import { sortPropTest } from './_propTests/sortPropTest';

const baseColumns = [
  {
    label: 'id',
    name: 'id',
  },
  {
    isSortable: true,
    label: 'column2',
    name: 'column2',
  },
  {
    label: 'column3',
    name: 'column3',
  },
];

const baseRows = [
  {
    column2: 2,
    column3: 3,
    id: 1,
  },
  {
    column2: 3,
    column3: 1,
    id: 2,
  },
  {
    column2: 1,
    column3: 2,
    id: 3,
  },
];

test.describe('Table', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...sortPropTest,
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
          <TableForTest
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
      const id = 'test-id';

      const component = await mount(
        <TableForTest
          columns={baseColumns}
          id={id}
          rows={baseRows}
        />,
      );

      await expect(component).toHaveAttribute('id', id);
      const headers = await component.getByRole('columnheader').all();
      await Promise.all(
        headers.map((header, index) => expect(header).toHaveAttribute('id', `${id}__headerCell__${baseColumns[index].name}`)),
      );

      const rows = await component.getByRole('row').all();
      rows.shift();

      const rowCells = await Promise.all(
        rows.map((row) => row.getByRole('cell').all()),
      );

      const testChain = [];

      rowCells.forEach((cells, rowIndex) => {
        cells.forEach((cell, cellIndex) => testChain.push(
          expect(cell).toHaveAttribute('id', `${id}__bodyCell__${baseColumns[cellIndex].name}__${baseRows[rowIndex].id}`),
        ));
      });

      await Promise.allSettled(testChain);
    });
  });

  test.describe('functionality', () => {
    test('execute sort callback on click', async ({ mount }) => {
      let called = false;
      let columnName;
      let directionName;

      const component = await mount(
        <TableForTest
          columns={baseColumns}
          rows={baseRows}
          sort={{
            ascendingIcon: <div>up</div>,
            column: 'column2',
            descendingIcon: <div>down</div>,
            direction: 'asc',
            onClick: (column: string, direction: string) => {
              called = true;
              columnName = column;
              directionName = direction;
            },
          }}
        />,
      );

      await component.getByText('up').click({ force: true });
      expect(called).toBe(true);
      expect(columnName).toBe('column2');
      expect(directionName).toBe('asc');
    });

    test('execute sort callback on Enter press', async ({ mount }) => {
      let called = false;
      let columnName;
      let directionName;

      const component = await mount(
        <TableForTest
          columns={baseColumns}
          rows={baseRows}
          sort={{
            ascendingIcon: <div>up</div>,
            column: 'column2',
            descendingIcon: <div>down</div>,
            direction: 'asc',
            onClick: (column: string, direction: string) => {
              called = true;
              columnName = column;
              directionName = direction;
            },
          }}
        />,
      );

      const button = component.getByRole('button');
      await button.focus();
      await button.press('Enter');
      expect(called).toBe(true);
      expect(columnName).toBe('column2');
      expect(directionName).toBe('asc');
    });

    test('has correct tab focus order', async ({
      mount,
      page,
    }) => {
      const allSortableColumns = baseColumns.map((column) => ({
        ...column,
        isSortable: true,
      }));

      await mount(
        <TableForTest
          columns={allSortableColumns}
          rows={baseRows}
          sort={{
            ascendingIcon: <div>up</div>,
            column: 'column2',
            descendingIcon: <div>down</div>,
            direction: 'asc',
            onClick: () => {},
          }}
        />,
      );

      const getFocusedElementParentInnerText = () => page.evaluate(() => {
        const selector = document.activeElement;
        return selector ? selector.parentElement.innerText : null;
      });

      await page.keyboard.press('Tab');
      const label1 = await getFocusedElementParentInnerText();
      expect(label1).toContain('id');

      await page.keyboard.press('Tab');
      const label2 = await getFocusedElementParentInnerText();
      expect(label2).toContain('column2');

      await page.keyboard.press('Tab');
      const label3 = await getFocusedElementParentInnerText();
      expect(label3).toContain('column3');

      await page.keyboard.press('Shift+Tab');
      const label4 = await getFocusedElementParentInnerText();
      expect(label4).toContain('column2');

      await page.keyboard.press('Shift+Tab');
      const label5 = await getFocusedElementParentInnerText();
      expect(label5).toContain('id');
    });
  });
});
