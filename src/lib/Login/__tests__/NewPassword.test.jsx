import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { NewPassword } from '../index';

jest.mock('../../Icon/load-material-design-icons');

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = mount(<NewPassword />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props except translations', () => {
    const tree = mount(<NewPassword
      logo="http://satyr.io/100x100/33?text=logo"
      title="Company"
      error="Error message"
      footer={(
        <a href="http://example.com">link</a>
      )}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with translations', () => {
    const tree = mount(<NewPassword
      translations={{
        changePassword: 'Změnit heslo',
        newPassword: 'Nové heslo',
        repeatNewPassword: 'Nové heslo znovu',
      }}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls submitHandler() on submit', () => {
    const spy = sinon.spy();
    const component = mount(<NewPassword submitHandler={spy} />);

    component
      .find('form')
      .simulate('submit');
    expect(spy.calledOnce).toEqual(true);
  });
});
