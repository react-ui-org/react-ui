export const refPropTest = (ref: React.RefObject<HTMLElement>) => [
  [
    {
      id: 'id',
      ref,
    },
    () => expect(ref.current).toHaveAttribute('id', 'id'),
  ],
];
