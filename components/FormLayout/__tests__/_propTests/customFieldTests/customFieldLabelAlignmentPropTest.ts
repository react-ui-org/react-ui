import type { CustomFieldTestsType } from './types';

const formLayoutHorizontalBaseProps = {
  fieldLayout: 'horizontal',
  labelWidth: 'auto',
};
const formLayoutVerticalBaseProps = {
  fieldLayout: 'vertical',
  labelWidth: 'auto',
};

const customFieldLayoutBaseProps = {
  label: 'Form layout custom field label',
};

export const customFieldLabelAlignmentPropTest: CustomFieldTestsType = [
  {
    customFieldLayoutProps: customFieldLayoutBaseProps,
    customFieldProps: {
      isLabelVisible: true,
      label: 'Custom field label',
    },
    name: 'labelVisible:boolean=true fieldLayout:string=horizontal',
    props: formLayoutHorizontalBaseProps,
  },
  {
    customFieldLayoutProps: customFieldLayoutBaseProps,
    customFieldProps: {
      isLabelVisible: false,
      label: 'Custom field label',
    },
    name: 'labelVisible:boolean=false fieldLayout:string=horizontal',
    props: formLayoutHorizontalBaseProps,
  },
  {
    customFieldLayoutProps: customFieldLayoutBaseProps,
    customFieldProps: {
      isLabelVisible: true,
      label: 'Custom field label',
    },
    name: 'labelVisible:boolean=true fieldLayout:string=vertical',
    props: formLayoutVerticalBaseProps,
  },
  {
    customFieldLayoutProps: customFieldLayoutBaseProps,
    customFieldProps: {
      isLabelVisible: false,
      label: 'Custom field label',
    },
    name: 'labelVisible:boolean=false fieldLayout:string=vertical',
    props: formLayoutVerticalBaseProps,
  },
];
