export const tagPropTest = [
  [
    { tag: 'section' },
    (rootElement: HTMLElement) => expect(rootElement).toContainHTML('<section'),
  ],
];
