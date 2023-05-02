export const raisedPropTest = [
  [
    { raised: true },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootRaised'),
  ],
  [
    { raised: false },
    (rootElement: HTMLElement) => expect(rootElement).not.toHaveClass('isRootRaised'),
  ],
];
