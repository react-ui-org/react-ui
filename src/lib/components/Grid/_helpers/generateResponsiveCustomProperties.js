export const generateResponsiveCustomProperties = (prop, infix) => {
  if (typeof prop === 'undefined') {
    return null;
  }

  if (typeof prop !== 'object') {
    return { [`--rui-local-${infix}-xs`]: prop };
  }

  return Object.keys(prop).reduce((acc, breakpoint) => ({
    ...acc,
    [`--rui-local-${infix}-${breakpoint}`]: prop[breakpoint],
  }), {});
};
