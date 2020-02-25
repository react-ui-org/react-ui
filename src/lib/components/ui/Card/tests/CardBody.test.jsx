import React from 'react';
import { shallow } from 'enzyme';
import CardBody from '../CardBody';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<CardBody><p>Card body content</p></CardBody>);

    expect(tree).toMatchSnapshot();
  });
});
