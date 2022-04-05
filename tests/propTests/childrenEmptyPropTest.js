export const childrenEmptyPropTest = [
  [
    { children: undefined },
    (rootElement) => expect(rootElement).toBeNull(),
  ],
  [
    { children: null },
    (rootElement) => expect(rootElement).toBeNull(),
  ],
  [
    { children: false },
    (rootElement) => expect(rootElement).toBeNull(),
  ],
  [
    { children: [] },
    (rootElement) => expect(rootElement).toBeNull(),
  ],
];

