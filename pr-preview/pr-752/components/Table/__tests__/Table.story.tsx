import React from 'react';
import { Table } from '..';
import type {
  TableColumn,
  TableProps,
  TableRow,
} from '..';
import type { StoryProps } from '../../../../tests/playwright';

type TableForTestProps = StoryProps<TableProps, 'columns' | 'rows'>;

const baseColumns: TableColumn[] = [
  {
    label: 'ID',
    name: 'id',
  },
  {
    label: 'Name',
    name: 'name',
  },
  {
    format: (date) => (date as Date).toLocaleDateString('en-GB'),
    isSortable: true,
    label: 'Date of birth',
    name: 'dateOfBirth',
  },
];

const baseRows: TableRow[] = [
  {
    dateOfBirth: new Date(1940, 10, 9),
    id: 1,
    name: 'John Lennon',
  },
  {
    dateOfBirth: new Date(1942, 6, 18),
    id: 2,
    name: 'Paul McCartney',
  },
  {
    dateOfBirth: new Date(1943, 2, 25),
    id: 3,
    name: 'George Harrison',
  },
  {
    dateOfBirth: new Date(1940, 7, 7),
    id: 4,
    name: 'Richard Starkey (Ringo Starr)',
  },
];

export const TableForTest = ({
  columns = baseColumns,
  rows = baseRows,
  ...props
}: TableForTestProps) => (
  <Table
    columns={columns}
    rows={rows}
    {...props}
  />
);
