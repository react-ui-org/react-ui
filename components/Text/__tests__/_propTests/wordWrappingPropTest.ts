import type { PropTests } from '../../../../../tests/playwright/types';

const text = 'LongWordThatHasNoBreakingPossibilities and a couple of ordinary words that are nice and well behaved.';

export const wordWrappingPropTest: PropTests = [
  {
    name: 'wordWrapping:string=normal',
    props: {
      children: text,
      wordWrapping: 'normal',
    },
  },
  {
    name: 'wordWrapping:string=long-words',
    props: {
      children: text,
      wordWrapping: 'long-words',
    },
  },
  {
    name: 'wordWrapping:string=anywhere',
    props: {
      children: text,
      wordWrapping: 'anywhere',
    },
  },
];
