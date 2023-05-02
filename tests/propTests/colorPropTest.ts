export const colorPropTest = [
  [
    { color: 'dark' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorDark'),
  ],
  [
    { color: 'danger' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorDanger'),
  ],
  [
    { color: 'help' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorHelp'),
  ],
  [
    { color: 'info' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorInfo'),
  ],
  [
    { color: 'light' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorLight'),
  ],
  [
    { color: 'note' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorNote'),
  ],
  [
    { color: 'success' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorSuccess'),
  ],
  [
    { color: 'warning' },
    (rootElement: HTMLElement) => expect(rootElement).toHaveClass('isRootColorWarning'),
  ],
];
