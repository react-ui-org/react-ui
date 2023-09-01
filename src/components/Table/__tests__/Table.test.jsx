import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from '../Table';

const mandatoryProps = {
  columns: [
    {
      label: 'ID',
      name: 'id',
    },
    {
      format: (date) => new Date(date).toJSON(),
      isSortable: true,
      label: 'Date of birth',
      name: 'dateOfBirth',
    },
  ],
  rows: [
    {
      dateOfBirth: '2018-01-31',
      id: 'jan-novak',
    },
    {
      dateOfBirth: '2018-02-14',
      id: 111,
    },
  ],
};

describe('rendering', () => {
  it.each([
    [
      { columns: mandatoryProps.columns },
      (rootElement) => {
        expect(within(rootElement).getByText('ID'));
        expect(within(rootElement).getByText('Date of birth'));
      },
    ],
    [
      {
        id: 'id',
        sort: {
          ascendingIcon: <span>ascending icon</span>,
          column: 'name',
          descendingIcon: <span>descending icon</span>,
          direction: 'asc',
          onClick: () => {},
        },
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByTestId('id__headerCell__id'));
        expect(within(rootElement).getByTestId('id__headerCell__dateOfBirth'));
        expect(within(rootElement).getByRole('button')).toHaveAttribute('id', 'id__headerCell__dateOfBirth__sortButton');
        expect(within(rootElement).getByTestId('id__headerCell__dateOfBirth'));
        expect(within(rootElement).getByTestId('id__bodyCell__id__jan-novak'));
        expect(within(rootElement).getByTestId('id__bodyCell__id__111'));
        expect(within(rootElement).getByTestId('id__bodyCell__dateOfBirth__jan-novak'));
        expect(within(rootElement).getByTestId('id__bodyCell__dateOfBirth__111'));
      },
    ],
    [
      { rows: mandatoryProps.rows },
      (rootElement) => {
        expect(within(rootElement).getByText('jan-novak'));
        expect(within(rootElement).getByText('2018-01-31T00:00:00.000Z'));
        expect(within(rootElement).getByText('111'));
        expect(within(rootElement).getByText('2018-02-14T00:00:00.000Z'));
      },
    ],
    [
      {
        sort: {
          ascendingIcon: <span>ascending icon</span>,
          column: 'dateOfBirth',
          descendingIcon: <span>descending icon</span>,
          direction: 'asc',
          onClick: () => {},
        },
      },
      (rootElement) => expect(within(rootElement).getByText('ascending icon')),
    ],
    [
      {
        sort: {
          ascendingIcon: <span>ascending icon</span>,
          column: 'dateOfBirth',
          descendingIcon: <span>descending icon</span>,
          direction: 'desc',
          onClick: () => {},
        },
      },
      (rootElement) => expect(within(rootElement).getByText('descending icon')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Table
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls onClick() on sorting button click', async () => {
    const spy = sinon.spy();
    render((
      <Table
        {...mandatoryProps}
        sort={{
          ascendingIcon: <span>ascending icon</span>,
          column: 'dateOfBirth',
          descendingIcon: <span>descending icon</span>,
          direction: 'asc',
          onClick: spy,
        }}
      />
    ));

    await userEvent.click(screen.getByRole('button'));
    expect(spy.calledOnce).toEqual(true);
    expect(spy.lastCall.args).toEqual(['dateOfBirth', 'asc']);
  });
});
