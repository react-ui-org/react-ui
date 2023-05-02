import {
  ResponsiveString, ResponsiveNumber, StringBreakPoints, NumberBreakPoints,
} from '../Grid.types';

const prepareValueByType = (value : ResponsiveNumber | ResponsiveString, type: string | undefined) => {
  if (type === 'spacing') {
    return `var(--rui-dimension-space-${value})`;
  }

  return value;
};

export const generateResponsiveCustomProperties = (
  prop: ResponsiveNumber | ResponsiveString | undefined,
  infix: string | null,
  type?: string,
) => {
  if (typeof prop === 'undefined') {
    return null;
  }

  if (typeof prop !== 'object') {
    return { [`--rui-local-${infix}-xs`]: prepareValueByType(prop, type) };
  }

  return Object.keys(prop).reduce((acc, breakpoint) => ({
    ...acc,
    [`--rui-local-${infix}-${breakpoint}`]: prepareValueByType(prop[breakpoint as keyof NumberBreakPoints | keyof StringBreakPoints] as ResponsiveNumber, type),
  }), {});
};
