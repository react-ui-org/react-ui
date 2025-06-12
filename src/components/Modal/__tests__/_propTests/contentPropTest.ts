import type { PropTests } from '../../../../../tests/playwright/types';

export const contentPropTest: PropTests = [
  {
    name: 'children:string=long',
    props: {
      children: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Sed ac dolor sit amet purus malesuada congue. Vestibulum fermentum tortor id mi. Sed ac dolor sit amet purus malesuada congue. Vivamus luctus egestas leo. Aenean fermentum risus id tortor. Pellentesque ipsum. Nunc auctor.',
    },
  },
];
