export const justifyPropTest = (itemType: string) => {
  const tests = [
    [
      { justify: 'start' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToStart`),
    ],
    [
      { justify: 'center' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToCenter`),
    ],
    [
      { justify: 'end' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToEnd`),
    ],
    [
      { justify: 'space-between' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToSpaceBetween`),
    ],
  ];
  if (itemType === 'Root') {
    tests.push([
      { justify: 'stretch' },
      (rootElement: HTMLElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToStretch`),
    ]);
  }

  return tests;
};
