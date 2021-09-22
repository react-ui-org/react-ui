import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { disabledPropTest } from '../../../../../../tests/propTests/disabledPropTest';
import { forwardedRefPropTest } from '../../../../../../tests/propTests/forwardedRefPropTest';
import { fullWidthPropTest } from '../../../../../../tests/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../../../tests/propTests/helpTextPropTest';
import { inFormLayoutPropTest } from '../../../../../../tests/propTests/inFormLayoutPropTest';
import { isLabelVisible } from '../../../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../../tests/propTests/validationTextPropTest';
import { FileInputField } from '../FileInputField';

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
        expect(within(rootElement).getByTestId('id__element'));
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
      },
    ],
    ...inFormLayoutPropTest,
    ...isLabelVisible,
    ...labelPropTest,
    ...layoutPropTest,
    ...requiredPropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <FileInputField
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls clickHandler()', () => {
    const spy = sinon.spy();
    render((
      <FileInputField
        {...mandatoryProps}
        changeHandler={spy}
      />
    ));

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    userEvent.upload(screen.getByLabelText('label'), file);
    expect(spy.calledOnce).toEqual(true);
  });
});
