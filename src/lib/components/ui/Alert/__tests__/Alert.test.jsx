import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { colorPropTest } from '../../../../../../tests/propTests/colorPropTest';
import defaultTranslations from '../../../../translations/en';
import { Alert } from '../Alert';

const mandatoryProps = {
  children: 'content',
  translations: defaultTranslations.Alert,
};

describe('rendering', () => {
  it.each([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...colorPropTest,
    [
      { icon: (<div>icon</div>) },
      (rootElement) => expect(within(rootElement).getByText('icon')),
    ],
    [
      {
        closeHandler: () => {},
        id: 'id',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByText('content')).toHaveAttribute('id', 'id__content');
        expect(within(rootElement).getByTitle('Close')).toHaveAttribute('id', 'id__close');
      },
    ],
    [
      {
        closeHandler: () => {},
        translations: { close: 'Custom Close' },
      },
      (rootElement) => expect(within(rootElement).getByTitle('Custom Close')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Alert
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls closeHandler() on Close button click', () => {
    const spy = sinon.spy();
    render((
      <Alert
        {...mandatoryProps}
        closeHandler={spy}
      />
    ));

    userEvent.click(screen.getByTitle('Close'));
    expect(spy.calledOnce).toEqual(true);
  });
});
