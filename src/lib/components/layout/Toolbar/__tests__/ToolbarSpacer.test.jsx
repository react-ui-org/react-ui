import React from 'react';
import { shallow } from 'enzyme';
import ToolbarSpacer from '../ToolbarSpacer';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow((
      <ToolbarSpacer />
    ));

    expect(tree).toMatchSnapshot();
  });
});
