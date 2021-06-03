import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { TextField } from '../TextField';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<TextField id="test" label="label" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with hidden label', () => {
    const tree = shallow(<TextField
      id="test"
      isLabelVisible={false}
      label="With hidden label"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with small input', () => {
    const tree = shallow(<TextField
      id="test"
      inputSize={5}
      label="Small input"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly the number input type', () => {
    const tree = shallow(<TextField
      id="test"
      label="Number input type"
      type="number"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly the number input type with small input', () => {
    const tree = shallow(<TextField
      id="test"
      label="Number input type"
      inputSize={1}
      type="number"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const tree = shallow(<TextField
      autoCapitalize="off"
      autoComplete="off"
      id="test"
      label="With custom props"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<TextField
      disabled
      fullWidth
      helpText="some help"
      id="test"
      inFormLayout
      inputSize={20}
      isLabelVisible={false}
      label="All props"
      layout="horizontal"
      placeholder="placeholder"
      required
      size="large"
      type="email"
      validationState="invalid"
      validationText="some error"
      value="value"
      variant="filled"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler()', () => {
    const spy = sinon.spy();
    const component = mount(<TextField
      changeHandler={spy}
      id="test"
      label="label"
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
