import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Documentation from '..';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<Documentation
      component={<div>Element</div>}
      name="Element"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
