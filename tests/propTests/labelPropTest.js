import { within } from '@testing-library/react';

export const labelPropTest = [
  [
    { label: 'label text' },
    (rootElement) => expect(within(rootElement).getByText('label text')).toBeInTheDocument(),
  ],
];
