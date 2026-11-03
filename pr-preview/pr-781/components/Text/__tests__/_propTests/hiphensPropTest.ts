import type { PropTests } from '../../../../../tests/playwright/types';

const text = 'LongWordThatHasNoBreakingPossibilities and a couple of ordinary words that are nice and well behaved.';

// The long word contains soft hyphens (`&shy;`) where it can be broken
const textWithSoftHyphens = 'LongWord\u00ADThatHasManual\u00ADBreaking\u00ADPossibilities and a couple of ordinary words that are nice '
  + 'and well behaved.';

export const hyphensPropTest: PropTests = [
  {
    name: 'hyphens:string=none',
    props: {
      children: textWithSoftHyphens,
      hyphens: 'none',
      wordWrapping: 'normal',
    },
  },
  {
    name: 'hyphens:string=auto',
    props: {
      children: text,
      hyphens: 'auto',
      wordWrapping: 'normal',
    },
  },
  {
    name: 'hyphens:string=manual',
    props: {
      children: textWithSoftHyphens,
      hyphens: 'manual',
      wordWrapping: 'normal',
    },
  },
];
