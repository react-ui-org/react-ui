export const alignPropTest = (itemType) => (
  [
    [
      { align: 'top' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToTop`),
    ],
    [
      { align: 'middle' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToMiddle`),
    ],
    [
      { align: 'bottom' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToBottom`),
    ],
    [
      { align: 'baseline' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToBaseline`),
    ],
  ]
);

