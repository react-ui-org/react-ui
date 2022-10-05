export const actionColorPropTest = [
  [
    { color: 'primary' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorPrimary'),
  ],
  [
    { color: 'secondary' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorSecondary'),
  ],
  [
    { color: 'selected' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorSelected'),
  ],
];
