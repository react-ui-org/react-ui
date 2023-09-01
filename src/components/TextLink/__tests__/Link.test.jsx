import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { TextLink } from '../TextLink';

const mandatoryProps = {
  href: '/test/uri',
  label: 'link text',
};

describe('rendering', () => {
  it.each([
    [
      {},
      (rootElement) => expect(rootElement).toHaveAttribute('href', '/test/uri'),
    ],
    [
      { label: 'other text' },
      (rootElement) => expect(rootElement).toHaveTextContent('other text'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <TextLink
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls synthetic event onClick()', async () => {
    const spy = sinon.spy();
    render((
      <TextLink
        {...mandatoryProps}
        onClick={(e) => {
          e.preventDefault(); // Prevent the default navigation behavior
          spy();
        }}
      />
    ));

    await userEvent.click(screen.getByText('link text'));
    expect(spy.calledOnce).toEqual(true);
  });
});
