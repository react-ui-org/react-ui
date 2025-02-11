import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from '../TextField';
import { disabledPropTest } from '../../../../tests/jest/propTests/disabledPropTest';
import { refPropTest } from '../../../../tests/jest/propTests/refPropTest';
import { fullWidthPropTest } from '../../../../tests/jest/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../tests/jest/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../tests/jest/providerTests/formLayoutProviderTest';
import { isLabelVisibleTest } from '../../../../tests/jest/propTests/isLabelVisibleTest';
import { labelPropTest } from '../../../../tests/jest/propTests/labelPropTest';
import { layoutPropTest } from '../../../../tests/jest/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../tests/jest/propTests/requiredPropTest';
import { sizePropTest } from '../../../../tests/jest/propTests/sizePropTest';
import { validationStatePropTest } from '../../../../tests/jest/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../tests/jest/propTests/validationTextPropTest';
import { variantPropTest } from '../../../../tests/jest/propTests/variantPropTest';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  formLayoutProviderTest(<TextField {...mandatoryProps} />);

  it.each([
    ...disabledPropTest,
    ...refPropTest(React.createRef()),
    ...fullWidthPropTest,
    ...helpTextPropTest,
    [
      {
        helpText: 'help text',
        id: 'id',
        validationText: 'validation text',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id__label');
        expect(within(rootElement).getByTestId('id'));
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
      },
    ],
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
        expect(within(rootElement).getByLabelText('label')).not.toHaveAttribute('size');
        expect(rootElement).toHaveClass('hasRootCustomInputSize');
        expect(rootElement).toHaveStyle('--rui-custom-input-size: 3');
      },
    ],
    ...isLabelVisibleTest(),
    ...labelPropTest(),
    ...layoutPropTest,
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
  it('calls synthetic event onChange() on changing selected option', async () => {
    const spy = jest.fn();
    render((
      <TextField
        {...mandatoryProps}
        onChange={spy}
        value="content-value"
      />
    ));

    await userEvent.type(screen.getByRole('textbox'), 'content-value');
    expect(spy).toHaveBeenCalledTimes(13); // once per typed character
  });
});
