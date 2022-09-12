export const densePropTest = (itemType) => (
  [
    [
      { dense: true },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}Dense`),
    ],
    [
      { dense: false },
      (rootElement) => expect(rootElement).not.toHaveClass(`is${itemType}Dense`),
    ],
  ]
);

