export const requiredPropTest = [
  [
    { required: true },
    (rootElement) => expect(rootElement).toHaveClass('isRootRequired'),
  ],
  [
    { required: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isRootRequired'),
  ],
];
