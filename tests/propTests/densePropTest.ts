export const densePropTest = (itemType: string) => (
  [
    [
      { dense: true },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}Dense`),
    ],
    [
      { dense: false },
      (rootElement: HTMLElement) => expect(rootElement).not.toHaveClass(`is${itemType}Dense`),
    ],
  ]
);

