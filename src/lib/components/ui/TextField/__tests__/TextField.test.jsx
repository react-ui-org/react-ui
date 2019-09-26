import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import TextField from '..';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<TextField id="test" label="label" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with hidden label', () => {
    const tree = shallow(<TextField
      id="test"
      label="label"
      isLabelVisible={false}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<TextField
      autoCapitalize="on"
      autoComplete="username"
      id="test"
      helperText="some help"
      isLabelVisible={false}
      label="label"
      layout="horizontal"
      placeholder="placeholder"
      inputSize={3}
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
