import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import TextArea from '../index';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<TextArea fieldId="test" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<TextArea
      label="label"
      disabled
      fieldId="test"
      value="value"
      helpText="some help"
      errors={['some error', 'another error']}
      placeholder="placeholder"
      rows={5}
      required
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onChange()', () => {
    const spy = sinon.spy();
    const component = mount(<TextArea
      fieldId="test"
      onChange={spy}
    />);

    component
      .find('textarea')
      .simulate('change', {
        preventDefault: () => {},
        target: { value: 'test' },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});
