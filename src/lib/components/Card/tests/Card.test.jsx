import React from 'react';
import { shallow } from 'enzyme';
import Card from '..';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<Card><p>Card content</p></Card>);

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly error', () => {
    const tree = shallow(<Card type="error"><p>Card content</p></Card>);

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
});
