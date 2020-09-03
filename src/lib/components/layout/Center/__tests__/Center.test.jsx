import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Center } from '../Center';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<Center />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    const tree = shallow(<Center><div>test</div></Center>);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
