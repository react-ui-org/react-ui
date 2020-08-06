import React from 'react';
import { shallow } from 'enzyme';
import FormLayoutCustomField from '../FormLayoutCustomField';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <FormLayoutCustomField>
        <span>Custom text in form</span>
      </FormLayoutCustomField>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <FormLayoutCustomField>
        <span>Custom text in form 1</span>
        <span>Custom text in form 2</span>
        <span>Custom text in form 3</span>
      </FormLayoutCustomField>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <FormLayoutCustomField
        fullWidth
        label="Label"
        id="my-custom-field"
        layout="horizontal"
      >
        <span>Custom text in form 1</span>
        <span>Custom text in form 2</span>
        <span>Custom text in form 3</span>
      </FormLayoutCustomField>
    ));

    expect(tree).toMatchSnapshot();
  });
});
