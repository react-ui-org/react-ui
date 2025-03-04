export const renderAsRequiredPropTest = [
  [
    { renderAsRequired: true },
    (rootElement) => expect(rootElement).toHaveClass('isRootRequired'),
  ],
  [
    { renderAsRequired: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isRootRequired'),
  ],
];
