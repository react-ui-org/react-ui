import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TextField from '../index';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<TextField fieldId="test" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(
      <TextField
        label="label"
        disabled
        fieldId="test"
        value="value"
        helpText="some help"
        errors={['some error', 'another error']}
        placeholder="placeholder"
        type="email"
        required
        onChange={() => {}}
      />
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onChange with types specified', () => {
    const spy = sinon.spy();
    const event = {
      target: { value: 'value' },
    };
    const component = shallow(
      <TextField
        label="label"
        disabled
        value=""
        fieldId="test"
        helpText="some help"
        errors={['some error', 'another error']}
        placeholder="placeholder"
        type="email"
        required
        onChange={spy}
      />
    );

    component.find('input').simulate('change', event);
    expect(spy.withArgs('value').calledOnce).toEqual(true);
  });
});
