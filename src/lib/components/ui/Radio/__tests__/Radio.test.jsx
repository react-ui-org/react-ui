import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { Radio } from '../Radio';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<Radio
      id="test"
      label="label"
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
    const tree = shallow(<Radio
      id="test"
      label="label"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
      ]}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly only one option and hidden label', () => {
    const tree = shallow(<Radio
      id="test"
      isLabelVisible={false}
      label="label"
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
    const tree = shallow(<Radio
      disabled
      helpText="some help"
      id="test"
      inFormLayout
      label="label"
      layout="horizontal"
      options={[
        {
          disabled: true,
          label: 'choice 1',
          value: 'ch1',
        },
        {
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
      required
      validationState="warning"
      validationText="some error"
      value="ch1"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler() on changing selected option', () => {
    const spy = sinon.spy();
    const component = mount(<Radio
      changeHandler={spy}
      id="id"
      label="label"
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
      value="ch2"
    />);

    component
      .find('input')
      .first()
      .simulate('change', {
        preventDefault: () => {},
        target: { value: 'ch1' },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});
