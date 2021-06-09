import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { TextArea } from '../TextArea';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<TextArea label="label" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with hidden label', () => {
    const tree = shallow(<TextArea
      label="label"
      isLabelVisible={false}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<TextArea
      cols={10}
      disabled
      fullWidth
      helpText="some help"
      id="test"
      inFormLayout
      isLabelVisible={false}
      label="label"
      layout="horizontal"
      placeholder="placeholder"
      required
      rows={5}
      size="large"
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
    const component = mount(<TextArea
      changeHandler={spy}
      label="label"
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
