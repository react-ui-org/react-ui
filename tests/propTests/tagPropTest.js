export const tagPropTest = [
  [
    { tag: 'section' },
    (rootElement) => expect(rootElement.tagName).toEqual('SECTION'),
  ],
];
