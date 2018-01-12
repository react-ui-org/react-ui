import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import RadioList from '../index';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<RadioList
      fieldId="test"
      options={['choice 1', 'choice2']}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly only one option', () => {
    const tree = shallow(<RadioList
      fieldId="test"
      options={['choice 1']}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<RadioList
      label="label"
      disabled
      fieldId="test"
      value="value"
      helpText="some help"
      errors={['some error', 'another error']}
      required
      options={['choice 1', 'choice2']}
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
