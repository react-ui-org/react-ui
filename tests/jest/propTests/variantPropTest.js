export const variantPropTest = [
  [
    { variant: 'filled' },
    (rootElement) => expect(rootElement).toHaveClass('isRootVariantFilled'),
  ],
  [
    { variant: 'outline' },
    (rootElement) => expect(rootElement).toHaveClass('isRootVariantOutline'),
  ],
];
