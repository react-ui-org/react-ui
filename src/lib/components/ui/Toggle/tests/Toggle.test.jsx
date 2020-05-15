import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { Toggle } from '../Toggle';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<Toggle id="test" label="label" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<Toggle
      label="label"
      disabled
      id="test"
      value="value"
      description="some help"
      error="some error"
      isLabelVisible
      labelPosition="after"
      required
      checked
      validationState="warning"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onChange() when checked', () => {
    const spy = sinon.spy();
    const component = mount(<Toggle
      id="test"
      label="label"
      changeHandler={spy}
    />);

    component
      .find('input')
      .simulate('change', {
        preventDefault: () => {},
        target: { value: 'on' },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});
