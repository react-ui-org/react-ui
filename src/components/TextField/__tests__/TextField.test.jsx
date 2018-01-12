import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import TextField from '../index';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<TextField fieldId="test" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<TextField
      label="label"
      disabled
      fieldId="test"
      value="value"
      helpText="some help"
      errors={['some error', 'another error']}
      placeholder="placeholder"
      type="email"
      required
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onChange()', () => {
    const spy = sinon.spy();
    const component = mount(<TextField
      fieldId="test"
      onChange={spy}
    />);

    component
      .find('input')
      .simulate('change', {
        preventDefault: () => {},
        target: { value: 'test' },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});
