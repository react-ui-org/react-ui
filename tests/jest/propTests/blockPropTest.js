export const blockPropTest = [
  [
    { block: true },
    (rootElement) => expect(rootElement).toHaveClass('isRootBlock'),
  ],
  [
    { block: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isRootBlock'),
  ],
];
