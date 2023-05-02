export const idPropTest = [
  [
    { id: 'id' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveAttribute('id', 'id'),
  ],
];
