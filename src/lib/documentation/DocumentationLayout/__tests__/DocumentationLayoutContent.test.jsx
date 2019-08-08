import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { DocumentationLayoutContent } from '../index';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<DocumentationLayoutContent />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    const tree = shallow(<DocumentationLayoutContent><div>test</div></DocumentationLayoutContent>);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
