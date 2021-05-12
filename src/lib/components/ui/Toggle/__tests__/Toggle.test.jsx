import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../Toggle';
import { disabledPropTest } from '../../../../../../tests/propTests/disabledPropTest';
import { forwardedRefPropTest } from '../../../../../../tests/propTests/forwardedRefPropTest';
import { helpTextPropTest } from '../../../../../../tests/propTests/helpTextPropTest';
import { inFormLayoutPropTest } from '../../../../../../tests/propTests/inFormLayoutPropTest';
import { isLabelVisible } from '../../../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../../tests/propTests/validationTextPropTest';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  it.each([
    [
      {
        changeHandler: () => {},
        checked: true,
      },
      (rootElement) => expect(within(rootElement).getByRole('checkbox')).toBeChecked(),
    ],
    [
      {
        changeHandler: () => {},
        checked: false,
      },
      (rootElement) => expect(within(rootElement).getByRole('checkbox')).not.toBeChecked(),
    ],
    ...disabledPropTest,
    ...forwardedRefPropTest(React.createRef()),
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
    ...inFormLayoutPropTest,
    ...isLabelVisible,
    ...labelPropTest,
    [
      { labelPosition: 'before' },
      (rootElement) => expect(rootElement).toHaveClass('hasRootLabelBefore'),
    ],
    [
      { labelPosition: 'after' },
      (rootElement) => expect(rootElement).not.toHaveClass('hasRootLabelBefore'),
    ],
    ...layoutPropTest,
    ...requiredPropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
    [
      { value: 'value' },
      (rootElement) => expect(within(rootElement).getByLabelText('label')).toHaveAttribute('value', 'value'),
    ],
    [
      { value: 1 },
      (rootElement) => expect(within(rootElement).getByLabelText('label')).toHaveAttribute('value', '1'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Toggle
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls changeHandler() on toggling', () => {
    const spy = sinon.spy();
    render((
      <Toggle
        {...mandatoryProps}
        changeHandler={spy}
      />
    ));

    userEvent.click(screen.getByRole('checkbox'));
    expect(spy.callCount).toEqual(1);
  });
});
