export const childrenEmptyPropTest = [
  [
    { children: undefined },
    (rootElement: HTMLElement) => expect(rootElement).toBeNull(),
  ],
  [
    { children: null },
    (rootElement: HTMLElement) => expect(rootElement).toBeNull(),
  ],
  [
    { children: false },
    (rootElement: HTMLElement) => expect(rootElement).toBeNull(),
  ],
  [
    { children: [] },
    (rootElement: HTMLElement) => expect(rootElement).toBeNull(),
  ],
];

