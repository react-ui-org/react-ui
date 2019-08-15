import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DocumentationSwatch from '../';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<DocumentationSwatch color="primary" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
