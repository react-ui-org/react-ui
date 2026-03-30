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

export const customFieldRequiredPropTest: CustomFieldTestsType = [
  {
    customFieldLayoutProps: {
      ...customFieldLayoutBaseProps,
      required: true,
    },
    customFieldProps: customFieldBaseProps,
    name: 'required:boolean=true',
    props: formLayoutHorizontalBaseProps,
  },
  {
    customFieldLayoutProps: {
      ...customFieldLayoutBaseProps,
      required: false,
    },
    customFieldProps: customFieldBaseProps,
    name: 'required:boolean=false',
    props: formLayoutHorizontalBaseProps,
  },
];
