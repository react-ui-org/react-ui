import type { CustomFieldTestsType } from './types';

const formLayoutHorizontalBaseProps = {
  fieldLayout: 'horizontal',
  labelWidth: 'auto',
};

const customFieldLayoutBaseProps = {
  label: 'Form layout custom field label',
};

const customFieldBaseProps = {
  isLabelVisible: false,
  label: 'Custom field label',
};

export const customFieldFullWidthPropTest: CustomFieldTestsType = [
  {
    customFieldLayoutProps: {
      ...customFieldLayoutBaseProps,
      fullWidth: true,
    },
    customFieldProps: customFieldBaseProps,
    name: 'fullWidth:boolean=true',
    props: formLayoutHorizontalBaseProps,
  },
];
