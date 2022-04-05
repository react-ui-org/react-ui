import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { childrenEmptyPropTest } from '../../../../../tests/propTests/childrenEmptyPropTest';
import { Media } from '../Media';
import { MediaBody } from '../MediaBody';
import { MediaObject } from '../MediaObject';

describe('rendering', () => {
  it.each([
    ...childrenEmptyPropTest,
    [
      { children: <MediaBody>content text</MediaBody> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      {
        children: [
          <MediaBody key="1">body content text</MediaBody>,
          <MediaObject key="2">object content text</MediaObject>,
        ],
      },
      (rootElement) => {
        expect(within(rootElement).getByText('body content text'));
        expect(within(rootElement).getByText('object content text'));
      },
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Media
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
