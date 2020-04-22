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
    const tree = shallow(<TextArea label="label" id="test" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with hidden label', () => {
    const tree = shallow(<TextArea
      id="test"
      label="label"
      isLabelVisible={false}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<TextArea
      cols={10}
      id="test"
      helperText="some help"
      isLabelVisible={false}
      label="label"
      layout="horizontal"
      placeholder="placeholder"
      rows={5}
      validationState="invalid"
      value="value"
      variant="filled"
      size="large"
      fullWidth
      disabled
      required
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with html element attributes', () => {
    const tree = shallow(<TextArea
      htmlElementAttributes={{ tabIndex: -1 }}
      label="label"
      id="test"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler()', () => {
    const spy = sinon.spy();
    const component = mount(<TextArea
      id="test"
      label="label"
      changeHandler={spy}
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
