import React from 'react';
import { shallow } from 'enzyme';
import FormLayout from '../FormLayout';

describe('rendering', () => {
  it('renders correctly with a single child', () => {
    const tree = shallow((
      <FormLayout>
        <span>content</span>
      </FormLayout>
    ));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with multiple children', () => {
    const tree = shallow((
      <FormLayout>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
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
        <span>content</span>
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
        <span>content</span>
      </FormLayout>
    ));

    expect(tree).toMatchSnapshot();
  });
});
