export const forwardedRefPropTest = (ref) => [
  [
    {
      forwardedRef: ref,
      id: 'id'
    },
    () => expect(ref.current).toHaveAttribute('id', 'id'),
  ],
];
