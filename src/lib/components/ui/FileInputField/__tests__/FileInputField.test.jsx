import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { FileInputField } from '../FileInputField';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<FileInputField label="label" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with hidden label', () => {
    const tree = shallow(<FileInputField
      isLabelVisible={false}
      label="With hidden label"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const tree = shallow(<FileInputField
      accept=".pdf,.jpg,.jpeg,.png"
      label="With custom props"
      multiple
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<FileInputField
      disabled
      fullWidth
      helpText="some help"
      id="test"
      inFormLayout
      isLabelVisible={false}
      label="All props"
      layout="horizontal"
      required
      validationState="invalid"
      validationText="some error"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler()', () => {
    const spy = sinon.spy();
    const component = mount(<FileInputField
      changeHandler={spy}
      label="label"
    />);

    component
      .find('input')
      .simulate('change', {
        preventDefault: () => {},
        target: { files: ['test.jpg'] },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});
