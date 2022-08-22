import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Text } from '../Text';

const defaultProps = {
  children: 'sample text',
};

describe('rendering', () => {
  it.each([
    [
      { blockLevel: true },
      (rootElement) => expect(rootElement).toContainHTML('<div>sample text</div>'),
    ],
    [
      { blockLevel: false },
      (rootElement) => expect(rootElement).toContainHTML('<span>sample text</span>'),
    ],
    [
      { children: 'content text' },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      { children: undefined },
      (rootElement) => expect(rootElement).not.toBeInTheDocument(),
    ],
    [
      { hyphens: 'none' },
      (rootElement) => {
        expect(rootElement).not.toHaveClass('rootHyphensAuto');
        expect(rootElement).not.toHaveClass('rootHyphensManual');
      },
    ],
    [
      { hyphens: 'auto' },
      (rootElement) => expect(rootElement).toHaveClass('rootHyphensAuto'),
    ],
    [
      { hyphens: 'manual' },
      (rootElement) => expect(rootElement).toHaveClass('rootHyphensManual'),
    ],
    [
      { lines: 0 },
      (rootElement) => expect(rootElement).not.toHaveClass('rootClampLines'),
    ],
    [
      { lines: 1 },
      (rootElement) => expect(rootElement).toHaveClass('rootClampSingleLine'),
    ],
    [
      { lines: 2 },
      (rootElement) => expect(rootElement).toHaveClass('rootClampMultiLine'),
    ],
    [
      { wordWrapping: 'normal' },
      (rootElement) => {
        expect(rootElement).not.toHaveClass('rootWordWrappingAnywhere');
        expect(rootElement).not.toHaveClass('rootWordWrappingLongWords');
      },
    ],
    [
      { wordWrapping: 'long-words' },
      (rootElement) => expect(rootElement).toHaveClass('rootWordWrappingLongWords'),
    ],
    [
      { wordWrapping: 'anywhere' },
      (rootElement) => expect(rootElement).toHaveClass('rootWordWrappingAnywhere'),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Text
        {...defaultProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
