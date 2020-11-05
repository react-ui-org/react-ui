import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { SelectField } from '../SelectField';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<SelectField
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
    const tree = shallow(<SelectField
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

  it('renders correctly with all props', () => {
    const tree = shallow(<SelectField
      disabled
      fullWidth
      helpText="some help"
      id="test"
      inFormLayout
      isLabelVisible={false}
      label="label"
      layout="horizontal"
      options={[
        {
          label: 'choice 1',
          value: 'ch1',
        },
        {
          disabled: true,
          label: 'choice 2',
          value: 'ch2',
        },
      ]}
      required
      size="large"
      validationState="invalid"
      value="ch1"
      variant="filled"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler() on changing selected option', () => {
    const spy = sinon.spy();
    const component = mount(<SelectField
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
