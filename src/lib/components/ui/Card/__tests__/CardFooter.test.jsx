import React from 'react';
import { shallow } from 'enzyme';
import { CardFooter } from '../CardFooter';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<CardFooter><p>Card footer content</p></CardFooter>);

    expect(tree).toMatchSnapshot();
  });
});
