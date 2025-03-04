import {
  BreakPointKeys,
  GridBreakpoints,
  GridGapBreakpoints,
} from '../Grid.types';
import { RowColumnsBreakpoints } from '../GridSpan.types';

const prepareValueByType = (value: string | number, type: null | string) => {
  if (type === 'spacing') {
    return `var(--rui-dimension-space-${value})`;
  }

  return value;
};

export const generateResponsiveCustomProperties = (
  prop: string | number | GridBreakpoints | GridGapBreakpoints | RowColumnsBreakpoints | undefined,
  infix: string,
  type: null | string = null,
) => {
  if (typeof prop === 'undefined') {
    return null;
  }

  if (typeof prop !== 'object') {
    return { [`--rui-local-${infix}-xs`]: prepareValueByType(prop, type) };
  }

  return Object.keys(prop).reduce((acc, breakpoint) => ({
    ...acc,
    [`--rui-local-${infix}-${breakpoint}`]: prepareValueByType(prop[breakpoint as BreakPointKeys], type),
  }), {});
};
