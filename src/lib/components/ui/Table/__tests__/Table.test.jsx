import React from 'react';
import sinon from 'sinon';
import {
  mount,
  shallow,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Table from '../Table';

const columnsData = [
  {
    isSortable: true,
    label: 'Id',
    name: 'id',
  },
  {
    isSortable: true,
    label: 'Name',
    name: 'name',
  },
  {
    format: (row) => row.dateOfBirth.toDateString(),
    label: 'Date of birth',
    name: 'dateOfBirth',
  },
];

const rowsData = [
  {
    dateOfBirth: new Date(2018, 1, 1),
    id: 1,
    name: 'Jan Novak',
  },
];

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<Table
      columns={columnsData}
      rows={rowsData}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<Table
      columns={columnsData}
      id="custom-id"
      rows={rowsData}
      sort={{
        ascendingIcon: <span className="icon" />,
        changeHandler: () => {},
        column: 'id',
        descendingIcon: <span className="icon" />,
        direction: 'asc',
      }}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler() on sorting button click', () => {
    const spy = sinon.spy();
    const component = mount((
      <Table
        columns={columnsData}
        rows={rowsData}
        sort={{
          ascendingIcon: <span className="icon" />,
          changeHandler: spy,
          column: 'id',
          descendingIcon: <span className="icon" />,
          direction: 'asc',
        }}
      />
    ));

    component.find('Button').first().simulate('click');
    expect(spy.calledOnce).toEqual(true);
    expect(spy.args).toEqual([['id', 'asc']]);
  });
});
