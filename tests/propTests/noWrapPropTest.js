export const noWrapPropTest = (itemType) => (
  [
    [
      { nowrap: true },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}Nowrap`),
    ],
    [
      { nowrap: false },
      (rootElement) => expect(rootElement).not.toHaveClass(`is${itemType}Nowrap`),
    ],
  ]
);
