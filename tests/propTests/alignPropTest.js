export const alignPropTest = [
  [
    { align: 'top' },
    (rootElement) => expect(rootElement).toHaveClass('isAlignedToTop'),
  ],
  [
    { align: 'middle' },
    (rootElement) => expect(rootElement).toHaveClass('isAlignedToMiddle'),
  ],
  [
    { align: 'bottom' },
    (rootElement) => expect(rootElement).toHaveClass('isAlignedToBottom'),
  ],
  [
    { align: 'baseline' },
    (rootElement) => expect(rootElement).toHaveClass('isAlignedToBaseline'),
  ],
];

