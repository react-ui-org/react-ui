export const colorPropTest = [
  [
    { color: 'dark' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorDark'),
  ],
  [
    { color: 'danger' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorDanger'),
  ],
  [
    { color: 'help' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorHelp'),
  ],
  [
    { color: 'info' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorInfo'),
  ],
  [
    { color: 'light' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorLight'),
  ],
  [
    { color: 'note' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorNote'),
  ],
  [
    { color: 'primary' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorPrimary'),
  ],
  [
    { color: 'secondary' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorSecondary'),
  ],
  [
    { color: 'success' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorSuccess'),
  ],
  [
    { color: 'warning' },
    (rootElement) => expect(rootElement).toHaveClass('rootColorWarning'),
  ],
];
