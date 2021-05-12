export const raisedPropTest = [
  [
    { raised: true },
    (rootElement) => expect(rootElement).toHaveClass('rootRaised'),
  ],
  [
    { raised: false },
    (rootElement) => expect(rootElement).not.toHaveClass('rootRaised'),
  ],
];
