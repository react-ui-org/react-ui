import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { idPropTest } from '../../../../../tests/propTests/idPropTest';
import { Link } from '../Link';

const mandatoryProps = {
  href: '/test/uri',
};

describe('rendering', () => {
  it.each([
    [
      {},
      (rootElement) => expect(rootElement).toHaveAttribute('href', '/test/uri'),
    ],
    [
      { children: 'link text' },
      (rootElement) => expect(rootElement).toHaveTextContent('link text'),
    ],
    ...idPropTest,
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Link
        {...mandatoryProps}
        {...testedProps}
      >
        link text
      </Link>
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls synthetic event onClick()', () => {
    const spy = sinon.spy();
    render((
      <Link
        {...mandatoryProps}
        onClick={spy}
      >
        link text
      </Link>
    ));

    userEvent.click(screen.getByText('link text'));
    expect(spy.calledOnce).toEqual(true);
  });
});
