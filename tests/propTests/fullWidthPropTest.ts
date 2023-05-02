export const fullWidthPropTest = [
  [
    { fullWidth: true },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootFullWidth'),
  ],
  [
    { fullWidth: false },
    (rootElement : HTMLElement) => expect(rootElement).not.toHaveClass('isRootFullWidth'),
  ],
];
