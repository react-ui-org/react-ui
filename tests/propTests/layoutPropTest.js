export const layoutPropTest = [
  [
    { layout: 'vertical' },
    (rootElement) => expect(rootElement).toHaveClass('rootLayoutVertical'),
  ],
  [
    { layout: 'horizontal' },
    (rootElement) => expect(rootElement).toHaveClass('rootLayoutHorizontal'),
  ],
];
