import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { Login } from '../index';

jest.mock('../../Icon/load-material-design-icons');

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(<Login />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<Login
      logo="http://satyr.io/100x100/33?text=logo"
      title="Company"
      hasError
      footer={(
        <a href="http://example.com">link</a>
      )}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with username', () => {
    const tree = shallow(<Login usernameType="Username" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls submitHandler() on submit', () => {
    const spy = sinon.spy();
    const component = mount(<Login submitHandler={spy} />);

    component
      .find('form')
      .simulate('submit');
    expect(spy.calledOnce).toEqual(true);
  });
});