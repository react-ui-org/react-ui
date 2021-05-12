export const idPropTest = [
  [
    { id: 'id' },
    (rootElement) => expect(rootElement).toHaveAttribute('id', 'id'),
  ],
];
