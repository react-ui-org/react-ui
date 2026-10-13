import type { Breakpoint } from '../../../types';
import type {
  GridResponsivePropertyValue,
  GridResponsiveValue,
} from '../Grid.types';

const prepareValueByType = (value: GridResponsivePropertyValue, type: 'spacing' | null) => {
  if (type === 'spacing') {
    return `var(--rui-dimension-space-${value})`;
  }

  return value;
};

export const generateResponsiveCustomProperties = (
  prop: GridResponsiveValue<GridResponsivePropertyValue> | undefined,
  infix: string,
  type: 'spacing' | null = null,
): Record<string, GridResponsivePropertyValue> | null => {
  if (typeof prop === 'undefined') {
    return null;
  }

  if (typeof prop !== 'object') {
    return { [`--rui-local-${infix}-xs`]: prepareValueByType(prop, type) };
  }

  return Object.keys(prop).reduce<Record<string, GridResponsivePropertyValue>>((acc, breakpoint) => ({
    ...acc,
    [`--rui-local-${infix}-${breakpoint}`]: prepareValueByType(prop[breakpoint as Breakpoint] as GridResponsivePropertyValue, type),
  }), {});
};
