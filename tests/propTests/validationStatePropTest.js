export const validationStatePropTest = [
  [
    { validationState: 'invalid' },
    (rootElement) => expect(rootElement).toHaveClass('isRootStateInvalid'),
  ],
  [
    { validationState: 'valid' },
    (rootElement) => expect(rootElement).toHaveClass('isRootStateValid'),
  ],
  [
    { validationState: 'warning' },
    (rootElement) => expect(rootElement).toHaveClass('isRootStateWarning'),
  ],
];
