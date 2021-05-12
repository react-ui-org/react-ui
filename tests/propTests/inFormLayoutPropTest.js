export const inFormLayoutPropTest = [
  [
    { inFormLayout: true },
    (rootElement) => expect(rootElement).toHaveClass('isRootInFormLayout'),
  ],
  [
    { inFormLayout: false },
    (rootElement) => expect(rootElement).not.toHaveClass('isRootInFormLayout'),
  ],
];
