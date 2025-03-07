import type { PropTests } from '../types';

export const helpTextAndValidationTextPropType: PropTests = [
  {
    name: 'helpText:string & validationText:undefined',
    props: {
      helpText: 'Some normal helpText.',
      validationText: undefined,
    },
  },
  {
    name: 'helpText:undefined & validationText:string',
    props: {
      helpText: undefined,
      validationText: 'Some normal validationText.',
    },
  },
  {
    name: 'helpText:string & validationText:string',
    props: {
      helpText: 'Some normal helpText.',
      validationText: 'Some normal validationText.',
    },
  },
];
