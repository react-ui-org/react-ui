import React from 'react';
import { shallow } from 'enzyme';
import MediaBody from '../MediaBody';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <MediaBody>
        <span>content</span>
      </MediaBody>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <MediaBody>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </MediaBody>
    ));

    expect(tree).toMatchSnapshot();
  });
});
