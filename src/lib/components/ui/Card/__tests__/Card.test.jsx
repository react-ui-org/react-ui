import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../Card';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<Card><p>Card content</p></Card>);

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly in danger color', () => {
    const tree = shallow(<Card color="danger"><p>Card content</p></Card>);

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly disabled', () => {
    const tree = shallow(<Card disabled><p>Card content</p></Card>);

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly raised', () => {
    const tree = shallow(<Card raised><p>Card content</p></Card>);

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(
      <Card
        color="warning"
        dense
        disabled
        id="custom-id"
        raised
      >
        <p>Card content</p>
      </Card>,
    );

    expect(tree).toMatchSnapshot();
  });
});
