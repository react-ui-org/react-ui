export const justifyPropTest = (itemType) => {
  const tests = [
    [
      { justify: 'start' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToStart`),
    ],
    [
      { justify: 'center' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToCenter`),
    ],
    [
      { justify: 'end' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToEnd`),
    ],
    [
      { justify: 'space-between' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToSpaceBetween`),
    ],
  ];
  if (itemType === 'Root') {
    tests.push([
      { justify: 'stretch' },
      (rootElement) => expect(rootElement).toHaveClass(`is${itemType}JustifiedToStretch`),
    ]);
  }

  return tests;
};
