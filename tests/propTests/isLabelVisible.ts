import { within } from '@testing-library/react';

export const isLabelVisible = [
  [
    { isLabelVisible: true },
    (rootElement: HTMLElement) => expect(within(rootElement).getByText('label')).not.toHaveClass('isLabelHidden'),
  ],
  [
    { isLabelVisible: false },
    (rootElement: HTMLElement) => expect(within(rootElement).getByText('label')).toHaveClass('isLabelHidden'),
  ],
];
