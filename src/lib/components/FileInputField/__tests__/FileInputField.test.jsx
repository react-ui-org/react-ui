import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { disabledPropTest } from '../../../../../tests/propTests/disabledPropTest';
import { forwardedRefPropTest } from '../../../../../tests/propTests/forwardedRefPropTest';
import { fullWidthPropTest } from '../../../../../tests/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../../tests/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../../tests/providerTests/formLayoutProviderTest';
import { isLabelVisible } from '../../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../tests/propTests/validationTextPropTest';
import { FileInputField } from '../FileInputField';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  formLayoutProviderTest(<FileInputField {...mandatoryProps} />);

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
        expect(within(rootElement).getByTestId('id'));
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
        expect(rootElement).toHaveAttribute('id', 'id__label');
      },
    ],
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
  it('calls synthetic event onChange()', () => {
    const spy = sinon.spy();
    render((
      <FileInputField
        {...mandatoryProps}
        onChange={spy}
      />
    ));

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    userEvent.upload(screen.getByLabelText('label'), file);
    expect(spy.calledOnce).toEqual(true);
  });
});
