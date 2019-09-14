import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DocumentationPlaceholder from '..';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<DocumentationPlaceholder text="text" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
