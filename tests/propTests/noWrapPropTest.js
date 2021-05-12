export const noWrapPropTest = [
  [
    { nowrap: true },
    (rootElement) => expect(rootElement).toHaveClass('isNowrap'),
  ],
  [
    { nowrap: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isNowrap'),
  ],
];
