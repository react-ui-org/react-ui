import React from 'react';
import { shallow } from 'enzyme';
import { MediaObject } from '../MediaObject';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <MediaObject>
        <span>content</span>
      </MediaObject>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <MediaObject>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </MediaObject>
    ));

    expect(tree).toMatchSnapshot();
  });
});
