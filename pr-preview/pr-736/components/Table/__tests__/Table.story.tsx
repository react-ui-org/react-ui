import React from 'react';
import type { HTMLAttributes } from 'react';
import { Table } from '..';

// Types for story component will be improved when we have full TypeScript support
type TableForTestProps = HTMLAttributes<HTMLTableElement>;

const baseColumns = [
  {
    label: 'ID',
    name: 'id',
  },
  {
    label: 'Name',
    name: 'name',
  },
  {
    format: (date: Date) => date.toLocaleDateString('en-GB'),
    isSortable: true,
    label: 'Date of birth',
    name: 'dateOfBirth',
  },
];

const baseRows = [
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
  ...props
}: TableForTestProps) => (
  <Table
    columns={baseColumns}
    rows={baseRows}
    {...props}
  />
);
