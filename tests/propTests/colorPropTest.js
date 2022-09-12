export const colorPropTest = [
  [
    { color: 'dark' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorDark'),
  ],
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
    { color: 'light' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorLight'),
  ],
  [
    { color: 'note' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorNote'),
  ],
  [
    { color: 'primary' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorPrimary'),
  ],
  [
    { color: 'secondary' },
    (rootElement) => expect(rootElement).toHaveClass('isRootColorSecondary'),
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
