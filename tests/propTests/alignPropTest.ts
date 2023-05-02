export const alignPropTest = (itemType: string) => (
  [
    [
      { align: 'top' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToTop`),
    ],
    [
      { align: 'middle' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToMiddle`),
    ],
    [
      { align: 'bottom' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToBottom`),
    ],
    [
      { align: 'baseline' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}AlignedToBaseline`),
    ],
  ]
);

