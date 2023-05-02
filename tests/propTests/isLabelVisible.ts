import { within } from '@testing-library/react';

export const isLabelVisible = [
  [
    { isLabelVisible: true },
    (rootElement) => expect(within(rootElement).getByText('label')).not.toHaveClass('isLabelHidden'),
  ],
  [
    { isLabelVisible: false },
    (rootElement) => expect(within(rootElement).getByText('label')).toHaveClass('isLabelHidden'),
  ],
];
