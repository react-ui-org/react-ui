export default (placementStyle) => {
  const validProps = [
    'position',
    'inset',
    'inset-inline-start',
    'inset-inline-end',
    'inset-block-start',
    'inset-block-end',
    'top',
    'right',
    'bottom',
    'left',
    'translate',
    'transform-origin',
  ];

  if (process.env.NODE_ENV !== 'production') {
    const invalidProps = Object.keys(placementStyle).filter((prop) => !validProps.includes(prop));

    if (invalidProps.length > 0) {
      // eslint-disable-next-line no-console
      console.error(`Invalid prop(s) supplied to the "placementStyle" prop: "${invalidProps.join('", "')}"`);
    }
  }

  return Object.fromEntries(
    Object.entries(placementStyle).filter(([prop]) => validProps.includes(prop)),
  );
};
