import React from 'react';
import sinon from 'sinon';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { colorPropTest } from '../../../../tests/propTests/colorPropTest';
import defaultTranslations from '../../translations/en';
import { Alert } from './Alert';

const mandatoryProps = {
  children: 'content',
  translations: defaultTranslations.Alert,
};

describe('rendering', () => {
  it.each<TestingProps>([
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    ...(colorPropTest as unknown as TestingProps[]),
    [
      { icon: (<div>icon</div>) },
      (rootElement) => expect(within(rootElement).getByText('icon')),
    ],
    [
      {
        id: 'id',
        onClose: () => { },
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByText('content')).toHaveAttribute('id', 'id__content');
        expect(within(rootElement).getByTitle('Close')).toHaveAttribute('id', 'id__close');
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Alert
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild as HTMLElement);
  });
});

describe('functionality', () => {
  it('calls onClose() on Close button click', () => {
    const spy = sinon.spy();
    render((
      <Alert
        {...mandatoryProps}
        onClose={spy}
      />
    ));

    userEvent.click(screen.getByTitle('Close'));
    expect(spy.calledOnce).toEqual(true);
  });
});
