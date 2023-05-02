export const sizePropTest = [
  [
    { size: 'small' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootSizeSmall'),
  ],
  [
    { size: 'medium' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootSizeMedium'),
  ],
  [
    { size: 'large' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootSizeLarge'),
  ],

];
