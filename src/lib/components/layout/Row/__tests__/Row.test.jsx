import React from 'react';
import { shallow } from 'enzyme';
import Row from '../Row';
import RowEnd from '../RowEnd';
import RowStart from '../RowStart';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <Row>
        <RowStart>start</RowStart>
      </Row>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <Row>
        <RowStart>start</RowStart>
        <RowEnd>end</RowEnd>
      </Row>
    ));

    expect(tree).toMatchSnapshot();
  });
});
