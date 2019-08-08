import React from 'react';
import { shallow } from 'enzyme';
import Row from '../Row';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Row>
        <span>content</span>
      </Row>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Row>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </Row>
    ));

    expect(tree).toMatchSnapshot();
  });
});
