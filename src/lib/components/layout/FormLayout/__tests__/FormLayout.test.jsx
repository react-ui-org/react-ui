import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../../../ui/TextField';
import FormLayout from '../FormLayout';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <FormLayout>
        <TextField id="test-id" label="Text field" />
      </FormLayout>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <FormLayout>
        <TextField id="test-id-1" label="Text field 1" />
        <TextField id="test-id-2" label="Text field 2" />
        <TextField id="test-id-3" label="Text field 3" />
      </FormLayout>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom label width', () => {
    const tree = shallow((
      <FormLayout
        fieldLayout="horizontal"
        id="test-id"
        labelWidth="300px"
      >
        <TextField id="test-id" label="Text field" />
      </FormLayout>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <FormLayout
        fieldLayout="horizontal"
        id="test-id"
        labelAutoWidthFallback="200px"
        labelWidth="auto"
      >
        <TextField id="test-id" label="Text field" />
      </FormLayout>
    ));

    expect(tree).toMatchSnapshot();
  });
});
