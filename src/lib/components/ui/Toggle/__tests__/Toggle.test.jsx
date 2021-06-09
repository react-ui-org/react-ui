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
    const tree = shallow(<Toggle label="label" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<Toggle
      checked
      disabled
      id="test"
      helpText="some help"
      inFormLayout
      isLabelVisible
      label="label"
      labelPosition="after"
      layout="horizontal"
      required
      validationState="warning"
      validationText="some error"
      value="value"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onChange() when checked', () => {
    const spy = sinon.spy();
    const component = mount(<Toggle
      changeHandler={spy}
      label="label"
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
