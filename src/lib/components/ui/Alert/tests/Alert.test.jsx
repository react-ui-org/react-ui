import React from 'react';
import {
  shallow,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Alert from '../Alert';

jest.mock('../../Icon/load-material-design-icons');

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(
      <Alert
        message="Message"
      >
        <div>Children</div>
      </Alert>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly type', () => {
    const tree = shallow(
      <Alert
        message="Message"
        type="success"
      >
        <div>Children</div>
      </Alert>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
