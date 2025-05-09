import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Text } from '../Text.tsx';

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
        expect(rootElement).not.toHaveClass('isRootHyphensAuto');
        expect(rootElement).not.toHaveClass('isRootHyphensManual');
      },
    ],
    [
      { hyphens: 'auto' },
      (rootElement) => expect(rootElement).toHaveClass('isRootHyphensAuto'),
    ],
    [
      { hyphens: 'manual' },
      (rootElement) => expect(rootElement).toHaveClass('isRootHyphensManual'),
    ],
    [
      { lines: 0 },
      (rootElement) => expect(rootElement).not.toHaveClass('isRootClampLines'),
    ],
    [
      { lines: 1 },
      (rootElement) => expect(rootElement).toHaveClass('isRootClampSingleLine'),
    ],
    [
      { lines: 2 },
      (rootElement) => expect(rootElement).toHaveClass('isRootClampMultiLine'),
    ],
    [
      { wordWrapping: 'normal' },
      (rootElement) => {
        expect(rootElement).not.toHaveClass('isRootWordWrappingAnywhere');
        expect(rootElement).not.toHaveClass('isRootWordWrappingLongWords');
      },
    ],
    [
      { wordWrapping: 'long-words' },
      (rootElement) => expect(rootElement).toHaveClass('isRootWordWrappingLongWords'),
    ],
    [
      { wordWrapping: 'anywhere' },
      (rootElement) => expect(rootElement).toHaveClass('isRootWordWrappingAnywhere'),
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
