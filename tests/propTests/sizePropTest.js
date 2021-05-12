export const sizePropTest = [
  [
    { size: 'small' },
    (rootElement) => expect(rootElement).toHaveClass('rootSizeSmall')
  ],
  [
    { size: 'medium' },
    (rootElement) => expect(rootElement).toHaveClass('rootSizeMedium')
  ],
  [
    { size: 'large' },
    (rootElement) => expect(rootElement).toHaveClass('rootSizeLarge')
  ],
];
