export const refPropTest = (ref) => [
  [
    {
      id: 'id',
      ref,
    },
    () => expect(ref.current).toHaveAttribute('id', 'id'),
  ],
];
