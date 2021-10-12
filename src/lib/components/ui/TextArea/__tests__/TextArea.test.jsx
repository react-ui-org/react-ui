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
import { formLayoutProviderTest } from '../../../../../../tests/providerTests/formLayoutProviderTest';
import { isLabelVisible } from '../../../../../../tests/propTests/isLabelVisible';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../../../tests/propTests/layoutPropTest';
import { requiredPropTest } from '../../../../../../tests/propTests/requiredPropTest';
import { sizePropTest } from '../../../../../../tests/propTests/sizePropTest';
import { validationStatePropTest } from '../../../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../../../tests/propTests/validationTextPropTest';
import { variantPropTest } from '../../../../../../tests/propTests/variantPropTest';
import { TextArea } from '../TextArea';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  formLayoutProviderTest(<TextArea {...mandatoryProps} />);

  it.each([
    [
      { cols: 2 },
      (rootElement) => expect(within(rootElement).getByRole('textbox')).toHaveAttribute('cols', '2'),
    ],
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
        expect(rootElement).toHaveAttribute('id', 'id__label');
        expect(within(rootElement).getByTestId('id'));
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
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
    [
      { rows: 4 },
      (rootElement) => expect(within(rootElement).getByRole('textbox')).toHaveAttribute('rows', '4'),
    ],
    ...sizePropTest,
    ...validationStatePropTest,
    ...validationTextPropTest,
    [
      {
        changeHandler: () => {},
        value: 'content text',
      },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...variantPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <TextArea
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls changeHandler() on typing', () => {
    const spy = sinon.spy();
    render((
      <TextArea
        {...mandatoryProps}
        changeHandler={spy}
        value="content-value"
      />
    ));

    userEvent.type(screen.getByRole('textbox'), 'content-value');
    expect(spy.callCount).toEqual(13); // once per typed character
  });
});
