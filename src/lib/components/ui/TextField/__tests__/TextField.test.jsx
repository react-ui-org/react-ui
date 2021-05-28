import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { TextField } from '../TextField';
import FormLayoutContext from '../../../layout/FormLayout/FormLayoutContext';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = renderer.create((
      <TextField id="test" label="label" />
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with hidden label', () => {
    const tree = renderer.create((
      <TextField
        id="test"
        isLabelVisible={false}
        label="With hidden label"
      />
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with small input', () => {
    const tree = renderer.create((
      <TextField
        id="test"
        inputSize={5}
        label="Small input"
      />
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly the number input type', () => {
    const tree = renderer.create((
      <TextField
        id="test"
        label="Number input type"
        max={(1000 * 1000 * 1000 * 1000)}
        type="number"
      />
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly the number input type with small input', () => {
    const tree = renderer.create((
      <TextField
        id="test"
        label="Number input type"
        max={3}
        type="number"
      />
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with custom props', () => {
    const tree = renderer.create((
      <TextField
        autoCapitalize="off"
        autoComplete="off"
        id="test"
        label="With custom props"
      />
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = renderer.create((
      <TextField
        disabled
        fullWidth
        helpText="some help"
        id="test"
        inputSize={20}
        isLabelVisible={false}
        label="All props"
        layout="horizontal"
        max={30}
        placeholder="placeholder"
        required
        size="large"
        type="email"
        validationState="invalid"
        validationText="some error"
        value="value"
        variant="filled"
      />
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly with context', () => {
    const tree = renderer.create((
      <FormLayoutContext.Provider
        value={{
          inFormLayout: true,
          layout: 'horizontal',
        }}
      >
        <TextField
          id="test"
          label="All props"
          layout="vertical"
        />
      </FormLayoutContext.Provider>
    ));

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls changeHandler()', () => {
    const spy = sinon.spy();
    const component = mount((
      <TextField
        changeHandler={spy}
        id="test"
        label="label"
      />
    ));

    component
      .find('input')
      .simulate('change', {
        preventDefault: () => {},
        target: { value: 'test' },
      });
    expect(spy.calledOnce).toEqual(true);
  });
});
