import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CheckboxField from '../index';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<CheckboxField fieldId="test" />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<CheckboxField
      label="label"
      disabled
      fieldId="test"
      value="value"
      helpText="some help"
      errors={['some error', 'another error']}
      required
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
