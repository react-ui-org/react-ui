import React from 'react';
import type { PropTests } from '../../../../../tests/playwright/types';

export const wordWrappingPropTest: PropTests = [
  {
    name: 'wordWrapping:string=normal',
    props: {
      children: (
        <>
          LongWordThatHasNoBreakingPossibilities
          and a couple of ordinary words that are nice and well behaved.
        </>
      ),
      wordWrapping: 'normal',
    },
  },
  {
    name: 'wordWrapping:string=long-words',
    props: {
      children: (
        <>
          LongWordThatHasNoBreakingPossibilities
          and a couple of ordinary words that are nice and well behaved.
        </>
      ),
      wordWrapping: 'long-words',
    },
  },
  {
    name: 'wordWrapping:string=anywhere',
    props: {
      children: (
        <>
          LongWordThatHasNoBreakingPossibilities
          and a couple of ordinary words that are nice and well behaved.
        </>
      ),
      wordWrapping: 'anywhere',
    },
  },
];
