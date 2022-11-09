import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import { refPropTest } from '../../../../tests/propTests/refPropTest';
import { Popover } from '../Popover';

const mandatoryProps = {
  children: <div>content text</div>,
};

describe('rendering', () => {
  it('renders with "portalId" prop', () => {
    document.body.innerHTML = '<div id="portal-id" />';
    render((
      <Popover
        {...mandatoryProps}
        id="id"
        portalId="portal-id"
      >
        content
      </Popover>
    ));

    expect(screen.getByTestId('portal-id').firstChild).toHaveAttribute('id', 'id');
    document.body.innerHTML = '';
  });

  it.each([
    ...refPropTest(React.createRef()),
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { ref: React.createRef() },
      (rootElement) => expect(rootElement).toHaveClass('isRootControlled'),
    ],
    [
      { placement: 'top' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtTop isRootAtCenter'),
    ],
    [
      { placement: 'top-start' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtTop isRootAtStart'),
    ],
    [
      { placement: 'top-end' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtTop isRootAtEnd'),
    ],
    [
      { placement: 'right' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtRight isRootAtCenter'),
    ],
    [
      { placement: 'right-start' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtRight isRootAtStart'),
    ],
    [
      { placement: 'right-end' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtRight isRootAtEnd'),
    ],
    [
      { placement: 'bottom' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtBottom isRootAtCenter'),
    ],
    [
      { placement: 'bottom-start' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtBottom isRootAtStart'),
    ],
    [
      { placement: 'bottom-end' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtBottom isRootAtEnd'),
    ],
    [
      { placement: 'left' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtLeft isRootAtCenter'),
    ],
    [
      { placement: 'left-start' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtLeft isRootAtStart'),
    ],
    [
      { placement: 'left-end' },
      (rootElement) => expect(rootElement).toHaveClass('isRootAtLeft isRootAtEnd'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Popover
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
