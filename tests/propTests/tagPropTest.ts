export const tagPropTest = [
  [
    { tag: 'section' },
    (rootElement) => expect(rootElement).toContainHTML('<section'),
  ],
];
