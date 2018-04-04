import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LayoutCenter from '../index';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<LayoutCenter />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    const tree = shallow(<LayoutCenter><div>test</div></LayoutCenter>);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
