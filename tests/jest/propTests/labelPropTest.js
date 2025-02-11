import { within } from '@testing-library/react';

export const labelPropTest = (type = 'label') => (
  [
    [
      {
        id: 'id',
        label: 'label text',
      },
      (rootElement) => {
        if (type === 'legend') {
          expect(within(rootElement).getByTestId('id__displayLabel')).toHaveTextContent('label text');
          expect(within(rootElement).getByTestId('id__label')).toHaveTextContent('label text');
        } else {
          expect(within(rootElement).getByText('label text')).toBeInTheDocument();
        }
      },
    ],
  ]
);
