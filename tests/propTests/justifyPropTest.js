export const justifyPropTest = [
  [
    { justify: 'start' },
    (rootElement) => expect(rootElement).toHaveClass('isJustifiedToStart'),
  ],
  [
    { justify: 'center' },
    (rootElement) => expect(rootElement).toHaveClass('isJustifiedToCenter'),
  ],
  [
    { justify: 'end' },
    (rootElement) => expect(rootElement).toHaveClass('isJustifiedToEnd'),
  ],
  [
    { justify: 'space-between' },
    (rootElement) => expect(rootElement).toHaveClass('isJustifiedToSpaceBetween'),
  ],
  [
    { justify: 'stretch' },
    (rootElement) => expect(rootElement).toHaveClass('isJustifiedToStretch'),
  ],
];
