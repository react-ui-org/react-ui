export const fullWidthPropTest = [
  [
    { fullWidth: true },
    (rootElement) => expect(rootElement).toHaveClass('isRootFullWidth'),
  ],
  [
    { fullWidth: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isRootFullWidth'),
  ],
];
