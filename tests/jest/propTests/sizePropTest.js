export const sizePropTest = [
  [
    { size: 'small' },
    (rootElement) => expect(rootElement).toHaveClass('isRootSizeSmall'),
  ],
  [
    { size: 'medium' },
    (rootElement) => expect(rootElement).toHaveClass('isRootSizeMedium'),
  ],
  [
    { size: 'large' },
    (rootElement) => expect(rootElement).toHaveClass('isRootSizeLarge'),
  ],

];
