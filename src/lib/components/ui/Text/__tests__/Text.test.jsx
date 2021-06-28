import React from 'react';
import { shallow } from 'enzyme';
import { Text } from '../Text';

describe('rendering', () => {
  it('renders correctly with no props', () => {
    const tree = shallow(
      <Text>
        test
      </Text>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly as div', () => {
    const tree = shallow(
      <Text blockLevel>
        test
      </Text>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with word wrapping', () => {
    const tree = shallow(
      <Text wordWrapping="long-words">
        test
      </Text>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with line clamp', () => {
    const tree = shallow(
      <Text lines={2}>
        test
      </Text>,
    );

    expect(tree).toMatchSnapshot();
  });
});
