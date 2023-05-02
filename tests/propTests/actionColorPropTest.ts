export const actionColorPropTest = [
  [
    { color: 'primary' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorPrimary'),
  ],
  [
    { color: 'secondary' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorSecondary'),
  ],
  [
    { color: 'selected' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorSelected'),
  ],
];
