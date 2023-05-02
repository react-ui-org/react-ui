export const noWrapPropTest = (itemType: string) => (
  [
    [
      { nowrap: true },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}Nowrap`),
    ],
    [
      { nowrap: false },
      (rootElement: HTMLElement) => expect(rootElement).not.toHaveClass(`is${itemType}Nowrap`),
    ],
  ]
);
