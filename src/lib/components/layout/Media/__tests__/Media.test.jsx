import React from 'react';
import { shallow } from 'enzyme';
import { Media } from '../Media';
import { MediaBody } from '../MediaBody';
import { MediaObject } from '../MediaObject';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Media>
        <MediaBody>body</MediaBody>
      </Media>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Media>
        <MediaObject>object</MediaObject>
        <MediaBody>body</MediaBody>
      </Media>
    ));

    expect(tree).toMatchSnapshot();
  });
});
