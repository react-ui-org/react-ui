import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { CheckboxField } from '../CheckboxField';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<CheckboxField id="test" label="label" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<CheckboxField
      checked
      disabled
      helpText="some help"
      id="test"
      inFormLayout
      isLabelVisible
      label="label"
      labelPosition="after"
      layout="horizontal"
      required
      value="value"
      validationState="warning"
      validationText="some error"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onChange() when checked', () => {
    const spy = sinon.spy();
    const component = mount(<CheckboxField
      changeHandler={spy}
      id="test"
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
