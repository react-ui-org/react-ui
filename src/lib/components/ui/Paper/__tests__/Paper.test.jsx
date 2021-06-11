import React from 'react';
import { shallow } from 'enzyme';
import { Paper } from '../Paper';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<Paper><p>Paper content</p></Paper>);

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(
      <Paper id="custom-id" raised>
        <p>Paper content</p>
      </Paper>,
    );

    expect(tree).toMatchSnapshot();
  });
});
