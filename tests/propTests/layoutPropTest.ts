export const layoutPropTest = [
  [
    { layout: 'vertical' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootLayoutVertical'),
  ],
  [
    { layout: 'horizontal' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootLayoutHorizontal'),
  ],
];
