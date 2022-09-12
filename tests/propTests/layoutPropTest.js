export const layoutPropTest = [
  [
    { layout: 'vertical' },
    (rootElement) => expect(rootElement).toHaveClass('isRootLayoutVertical'),
  ],
  [
    { layout: 'horizontal' },
    (rootElement) => expect(rootElement).toHaveClass('isRootLayoutHorizontal'),
  ],
];
