import React from 'react';
import elementOfType from '../elementOfType';

const TestWrapper = (children) => <div>{children}</div>;
const TestItem = (children) => <div>{children}</div>;

const executeOptionalElementOfType = (component) => elementOfType(['TestItem'])(
  { children: component.props.children },
  'children',
  'TestWrapper',
);
const executeRequiredElementOfType = (component) => elementOfType(['TestItem']).isRequired(
  { children: component.props.children },
  'children',
  'TestWrapper',
);

describe('elementOfType', () => {
  it('test valid component which does not require children', () => {
    const component = (
      <TestWrapper />
    );

    const result = executeOptionalElementOfType(component);
    expect(result).toBeNull();
  });

  it('test valid component which does not require children with empty React.Fragment', () => {
    const component = (
      <TestWrapper>
        <>
          <>
          </>
        </>
      </TestWrapper>
    );

    const result = executeOptionalElementOfType(component);
    expect(result).toBeNull();
  });

  it('test valid component which does not require children with falsy condition', () => {
    const component = (
      <TestWrapper>
        {false && (
          <TestItem>Item</TestItem>
        )}
      </TestWrapper>
    );

    const result = executeOptionalElementOfType(component);
    expect(result).toBeNull();
  });

  it('test valid component which requires single child', () => {
    const component = (
      <TestWrapper>
        <TestItem>Item</TestItem>
      </TestWrapper>
    );

    const result = executeRequiredElementOfType(component);
    expect(result).toBeNull();
  });

  it('test valid component which requires multiple children', () => {
    const component = (
      <TestWrapper>
        <TestItem>Item</TestItem>
        <TestItem>Item</TestItem>
        <TestItem>Item</TestItem>
      </TestWrapper>
    );

    const result = executeRequiredElementOfType(component);
    expect(result).toBeNull();
  });

  it('test valid component which requires single child wrapped in React.Fragment', () => {
    const component = (
      <TestWrapper>
        <>
          <TestItem>Item</TestItem>
        </>
      </TestWrapper>
    );

    const result = executeRequiredElementOfType(component);
    expect(result).toBeNull();
  });

  it('test valid component which requires multiple children wrapped in React.Fragment', () => {
    const component = (
      <TestWrapper>
        <>
          <TestItem>Item</TestItem>
          <>
            <TestItem>Item</TestItem>
          </>
          <TestItem>Item</TestItem>
        </>
      </TestWrapper>
    );

    const result = executeRequiredElementOfType(component);
    expect(result).toBeNull();
  });

  it('test invalid component which requires children but none are passed in', () => {
    const component = (
      <TestWrapper />
    );

    const result = executeRequiredElementOfType(component);
    expect(result).toBeInstanceOf(Error);
  });

  it('test invalid component which requires children with any but empty React.Fragment passed in', () => {
    const component = (
      <TestWrapper>
        <>
          <>
          </>
        </>
      </TestWrapper>
    );

    const result = executeRequiredElementOfType(component);
    expect(result).toBeInstanceOf(Error);
  });

  it('test invalid component which which contains disallowed component', () => {
    const DisallowedTestItem = (children) => <div>{children}</div>;
    const component = (
      <TestWrapper>
        <TestItem>Item</TestItem>
        <DisallowedTestItem>Item</DisallowedTestItem>
      </TestWrapper>
    );

    const result = executeRequiredElementOfType(component);
    expect(result).toBeInstanceOf(Error);
  });

  it('test invalid `allowedTypes` passed in', () => {
    expect(() => {
      elementOfType()(
        { children: [] },
        'children',
        'TestWrapper',
      );
    }).toThrow();
  });
});
