export const variantPropTest = [
  [
    { variant: 'filled' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootVariantFilled'),
  ],
  [
    { variant: 'outline' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootVariantOutline'),
  ],
];
