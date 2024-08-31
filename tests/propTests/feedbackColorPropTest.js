export const feedbackColorPropTest = [
  [
    { color: 'danger' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorDanger'),
  ],
  [
    { color: 'help' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorHelp'),
  ],
  [
    { color: 'info' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorInfo'),
  ],
  [
    { color: 'note' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorNote'),
  ],
  [
    { color: 'success' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorSuccess'),
  ],
  [
    { color: 'warning' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorWarning'),
  ],
];
