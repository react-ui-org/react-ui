import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Alert from '..';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = mount(
      <Alert>
        <div>Children</div>
      </Alert>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = mount(
      <Alert
        closeHandler={() => {}}
        icon={<span className="icon" />}
        id="custom-id"
        type="success"
      >
        <div>Children</div>
      </Alert>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls closeHandler() on Close button click', () => {
    const spy = sinon.spy();
    const component = mount((
      <Alert
        closeHandler={spy}
        type="success"
      >
        <div>Children</div>
      </Alert>
    ));

    component.find('button').at(0).simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});
