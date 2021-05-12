export const densePropTest = [
  [
    { dense: true },
    (rootElement) => expect(rootElement).toHaveClass('isDense'),
  ],
  [
    { dense: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isDense'),
  ],
];
