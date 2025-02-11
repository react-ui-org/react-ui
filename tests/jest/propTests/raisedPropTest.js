export const raisedPropTest = [
  [
    { raised: true },
    (rootElement) => expect(rootElement).toHaveClass('isRootRaised'),
  ],
  [
    { raised: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isRootRaised'),
  ],
];
