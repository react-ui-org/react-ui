import React from 'react';
import {
  shallow,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Alert from '../Alert';

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

  it('renders correctly with all props', () => {
    const tree = shallow(
      <Alert
        icon={<span className="icon" />}
        id="custom-id"
        message="Message"
        type="success"
      >
        <div>Children</div>
      </Alert>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
