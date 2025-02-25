export const neutralColorPropTest = [
  [
    { color: 'dark' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorDark'),
  ],
  [
    { color: 'light' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorLight'),
  ],
];
