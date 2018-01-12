import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import SelectField from '../index';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<SelectField
      fieldId="test"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly only one option', () => {
    const tree = shallow(<SelectField
      fieldId="test"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
      ]}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<SelectField
      label="label"
      disabled
      fieldId="test"
      value="ch1"
      helpText="some help"
      errors={['some error', 'another error']}
      required
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onChange() on changing selected option', () => {
    const spy = sinon.spy();
    const component = mount(<SelectField
      fieldId="id"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
      onChange={spy}
      value="ch1"
    />);

    component
      .find('select')
      .simulate('change', {
        preventDefault: () => {},
        target: { value: 'ch2' },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});
