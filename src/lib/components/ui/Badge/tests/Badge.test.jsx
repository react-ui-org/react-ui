import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Badge } from '../Badge';

describe('rendering', () => {
  it('renders correctly with number label', () => {
    const tree = shallow(
      <Badge label={3} />,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with string label', () => {
    const tree = shallow(
      <Badge label="label" />,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(
      <Badge
        id="custom-id"
        label={3}
        priority="outline"
        type="warning"
      />,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
