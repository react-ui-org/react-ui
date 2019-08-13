import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { DocumentationLayoutSidebar } from '../';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<DocumentationLayoutSidebar />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    const tree = shallow(<DocumentationLayoutSidebar><div>test</div></DocumentationLayoutSidebar>);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
