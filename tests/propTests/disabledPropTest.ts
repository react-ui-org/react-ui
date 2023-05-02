import { within } from '@testing-library/react';

export const disabledPropTest = [
  [
    { disabled: true },
    (rootElement: HTMLElement) => {
      expect(rootElement).toHaveClass('isRootDisabled');
      expect(within(rootElement).getByLabelText('label')).toBeDisabled();
    },
  ],
  [
    { disabled: false },
    (rootElement: HTMLElement) => {
      expect(rootElement).not.toHaveClass('isRootDisabled');
      expect(within(rootElement).getByLabelText('label')).not.toBeDisabled();
    },
  ],
];
