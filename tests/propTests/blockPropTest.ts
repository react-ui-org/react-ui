export const blockPropTest = [
  [
    { block: true },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootBlock'),
  ],
  [
    { block: false },
    (rootElement: HTMLElement) => expect(rootElement).not.toHaveClass('isRootBlock'),
  ],
];
