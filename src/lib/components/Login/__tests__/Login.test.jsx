import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { Login } from '..';

jest.mock('../../Icon/load-material-design-icons');

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = mount(<Login />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props except translations', () => {
    const tree = mount(<Login
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
    const tree = mount(<Login usernameType="Username" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with translations', () => {
    const tree = mount(<Login
      translations={{
        email: 'E-mail',
        invalidUsernameOrPassword: 'Nesprávný e-mail nebo heslo',
        password: 'Heslo',
        signIn: 'Přihlásit se',
      }}
    />);

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

  it('calls onChangeHandler() on field change', () => {
    const spy = sinon.spy();
    const component = mount(<Login onChangeHandler={spy} />);

    component
      .find('input').first()
      .simulate('change');
    expect(spy.calledOnce).toEqual(true);
  });
});

