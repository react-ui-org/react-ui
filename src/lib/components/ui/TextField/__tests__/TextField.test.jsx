import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from '../TextField';
import { disabledPropTest } from '../../../../../../tests/propTests/disabledPropTest';
import { forwardedRefPropTest } from '../../../../../../tests/propTests/forwardedRefPropTest';
import { fullWidthPropTest } from '../../../../../../tests/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../../../tests/propTests/helpTextPropTest';
import { inFormLayoutPropTest } from '../../../../../../tests/propTests/inFormLayoutPropTest';
import { isLabelVisible } from '../../../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../../tests/propTests/requiredPropTest';
import { sizePropTest } from '../../../../../../tests/propTests/sizePropTest';
import { validationStatePropTest } from '../../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../../tests/propTests/validationTextPropTest';
import { variantPropTest } from '../../../../../../tests/propTests/variantPropTest';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  it.each([
    ...disabledPropTest,
    ...forwardedRefPropTest(React.createRef()),
    ...fullWidthPropTest,
    ...helpTextPropTest,
    [
      {
        helpText: 'help text',
        id: 'id',
        validationText: 'validation text',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByRole('textbox')).toHaveAttribute('id', 'id__element');
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
      },
    ],
    ...inFormLayoutPropTest,
    [
      { inputSize: 3 },
      (rootElement) => {
        expect(within(rootElement).getByRole('textbox')).toHaveAttribute('size', '3');
        expect(rootElement).toHaveStyle('--rui-custom-input-size: 3');
      },
    ],
    [
      {
        inputSize: 3,
        type: 'number',
      },
      (rootElement) => {
        expect(within(rootElement).getByRole('spinbutton')).not.toHaveAttribute('size');
        expect(rootElement).toHaveStyle('--rui-custom-input-size: 3');
      },
    ],
    ...isLabelVisible,
    ...labelPropTest,
    ...layoutPropTest,
    [
      { placeholder: 'placeholder text' },
      (rootElement) => expect(within(rootElement).getByPlaceholderText('placeholder text')),
    ],
    ...requiredPropTest,
    ...sizePropTest,
    [
      { type: 'email' },
      (rootElement) => expect(within(rootElement).getByRole('textbox')).toHaveAttribute('type', 'email'),
    ],
    [
      { type: 'number' },
      (rootElement) => expect(within(rootElement).getByLabelText('label')).toHaveAttribute('type', 'number'),
    ],
    [
      { type: 'password' },
      (rootElement) => expect(within(rootElement).getByLabelText('label')).toHaveAttribute('type', 'password'),
    ],
    [
      { type: 'tel' },
      (rootElement) => expect(within(rootElement).getByRole('textbox')).toHaveAttribute('type', 'tel'),
    ],
    [
      { type: 'text' },
      (rootElement) => expect(within(rootElement).getByRole('textbox')).toHaveAttribute('type', 'text'),
    ],
    ...validationStatePropTest,
    ...validationTextPropTest,
    [
      {
        changeHandler: () => {},
        value: 'content text',
      },
      (rootElement) => expect(within(rootElement).getByRole('textbox')).toHaveDisplayValue('content text'),
    ],
    [
      {
        changeHandler: () => {},
        value: 111,
      },
      (rootElement) => expect(within(rootElement).getByRole('textbox')).toHaveDisplayValue('111'),
    ],
    ...variantPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <TextField
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls changeHandler() on changing selected option', () => {
    const spy = sinon.spy();
    render((
      <TextField
        {...mandatoryProps}
        changeHandler={spy}
        value="content-value"
      />
    ));

    userEvent.type(screen.getByRole('textbox'), 'content-value');
    expect(spy.callCount).toEqual(13); // once per typed character
  });
});
