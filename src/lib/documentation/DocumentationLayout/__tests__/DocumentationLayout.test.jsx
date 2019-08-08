import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { DocumentationLayout } from '../index';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<DocumentationLayout />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with children', () => {
    const tree = shallow(<DocumentationLayout><div>test</div></DocumentationLayout>);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
