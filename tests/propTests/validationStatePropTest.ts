export const validationStatePropTest = [
  [
    { validationState: 'invalid' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootStateInvalid'),
  ],
  [
    { validationState: 'valid' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootStateValid'),
  ],
  [
    { validationState: 'warning' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootStateWarning'),
  ],
];
