const prepareValueByType = (value, type) => {
  if (type === 'spacing') {
    return `var(--rui-spacing-${value})`;
  }

  return value;
};

export const generateResponsiveCustomProperties = (prop, infix, type = null) => {
  if (typeof prop === 'undefined') {
    return null;
  }

  if (typeof prop !== 'object') {
    return { [`--rui-local-${infix}-xs`]: prepareValueByType(prop, type) };
  }

  return Object.keys(prop).reduce((acc, breakpoint) => ({
    ...acc,
    [`--rui-local-${infix}-${breakpoint}`]: prepareValueByType(prop[breakpoint], type),
  }), {});
};
