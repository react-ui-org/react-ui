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
      label="With hidden label"
      isLabelVisible={false}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with small input', () => {
    const tree = shallow(<TextField
      id="test"
      label="Small input"
      inputSize={5}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly the number input type', () => {
    const tree = shallow(<TextField
      id="test"
      label="Number input type"
      max={(1000 * 1000 * 1000 * 1000)}
      type="number"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly the number input type with small input', () => {
    const tree = shallow(<TextField
      id="test"
      label="Number input type"
      max={3}
      type="number"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const tree = shallow(<TextField
      id="test"
      label="With custom props"
      autoCapitalize="off"
      autoComplete="off"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<TextField
      id="test"
      helperText="some help"
      inFormLayout
      isLabelVisible={false}
      label="All props"
      layout="horizontal"
      max={30}
      placeholder="placeholder"
      inputSize={20}
      validationState="invalid"
      type="email"
      value="value"
      variant="filled"
      size="large"
      fullWidth
      disabled
      required
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler()', () => {
    const spy = sinon.spy();
    const component = mount(<TextField
      id="test"
      label="label"
      changeHandler={spy}
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
