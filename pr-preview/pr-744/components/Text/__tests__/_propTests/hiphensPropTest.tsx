import React from 'react';
import type { PropTests } from '../../../../../tests/playwright/types';

export const hyphensPropTest: PropTests = [
  {
    name: 'hyphens:string=none',
    props: {
      children: (
        <>
          LongWord&shy;ThatHasManual&shy;Breaking&shy;Possibilities
          and a couple of ordinary words that are nice and well behaved.
        </>
      ),
      hyphens: 'none',
      wordWrapping: 'normal',
    },
  },
  {
    name: 'hyphens:string=auto',
    props: {
      children: (
        <>
          LongWordThatHasNoBreakingPossibilities
          and a couple of ordinary words that are nice and well behaved.
        </>
      ),
      hyphens: 'auto',
      wordWrapping: 'normal',
    },
  },
  {
    name: 'hyphens:string=manual',
    props: {
      children: (
        <>
          LongWord&shy;ThatHasManual&shy;Breaking&shy;Possibilities
          and a couple of ordinary words that are nice and well behaved.
        </>
      ),
      hyphens: 'manual',
      wordWrapping: 'normal',
    },
  },
];
