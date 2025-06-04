import type { PropTests } from '../../../../../tests/playwright/types';

export const arrowsPropTest: PropTests = [
  {
    name: 'arrows:boolean=true',
    props: {
      arrows: true,
      endShadowBackground: 'linear-gradient(rgba(255 0 0 / 0), rgba(255 0 0 / 0.5), rgb(255, 0, 0))',
      endShadowSize: '4em',
      startShadowBackground: 'linear-gradient(rgb(255, 0, 0), rgba(255 0 0 / 0.5), rgba(255 0 0 / 0))',
      startShadowSize: '4em',
    },
  },
  {
    name: 'arrows:boolean=false',
    props: {
      arrows: false,
      endShadowBackground: 'linear-gradient(rgba(255 0 0 / 0), rgba(255 0 0 / 0.5), rgb(255, 0, 0))',
      endShadowSize: '4em',
      startShadowBackground: 'linear-gradient(rgb(255, 0, 0), rgba(255 0 0 / 0.5), rgba(255 0 0 / 0))',
      startShadowSize: '4em',
    },
  },
];
