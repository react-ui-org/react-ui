export const requiredPropTest = [
  [
    { required: true },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootRequired'),
  ],
  [
    { required: false },
    (rootElement: HTMLElement) => expect(rootElement).not.toHaveClass('isRootRequired'),
  ],
];
