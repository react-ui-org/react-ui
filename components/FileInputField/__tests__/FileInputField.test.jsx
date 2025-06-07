import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { disabledPropTest } from '../../../../tests/propTests/disabledPropTest';
import { refPropTest } from '../../../../tests/propTests/refPropTest';
import { fullWidthPropTest } from '../../../../tests/propTests/fullWidthPropTest';
import { helpTextPropTest } from '../../../../tests/propTests/helpTextPropTest';
import { formLayoutProviderTest } from '../../../../tests/providerTests/formLayoutProviderTest';
import { isLabelVisibleTest } from '../../../../tests/propTests/isLabelVisibleTest';
import { labelPropTest } from '../../../../tests/propTests/labelPropTest';
import { layoutPropTest } from '../../../../tests/propTests/layoutPropTest';
import { sizePropTest } from '../../../../tests/propTests/sizePropTest';
import { requiredPropTest } from '../../../../tests/propTests/requiredPropTest';
import { validationStatePropTest } from '../../../../tests/propTests/validationStatePropTest';
import { validationTextPropTest } from '../../../../tests/propTests/validationTextPropTest';
import { FileInputField } from '../FileInputField';

const mandatoryProps = {
  id: 'id',
  label: 'label',
  onFilesChanged: () => {},
};

describe('rendering', () => {
  formLayoutProviderTest(<FileInputField {...mandatoryProps} />);

  it.each([
    ...disabledPropTest,
    ...refPropTest(React.createRef()),
    ...fullWidthPropTest,
    ...helpTextPropTest,
    [
      {
        helpText: 'help text',
        validationText: 'validation text',
      },
      (rootElement) => {
        expect(within(rootElement).getByTestId('id'));
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
        expect(within(rootElement).getByText('help text')).toHaveAttribute('id', 'id__helpText');
        expect(within(rootElement).getByText('validation text')).toHaveAttribute('id', 'id__validationText');
        expect(rootElement).toHaveAttribute('id', 'id__root');
      },
    ],
    ...isLabelVisibleTest(),
    ...labelPropTest(),
    ...layoutPropTest,
    ...requiredPropTest,
    ...sizePropTest,
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
  it('calls synthetic event onChange()', async () => {
    const spy = jest.fn();
    render((
      <FileInputField
        {...mandatoryProps}
        id="id"
        onFilesChanged={spy}
      />
    ));

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await userEvent.upload(screen.getByTestId('id'), file);
    expect(spy).toHaveBeenCalled();
  });
});
