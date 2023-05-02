import { within } from '@testing-library/react';

export const labelPropTest = [
  [
    { label: 'label text' },
    (rootElement: HTMLElement) => expect(within(rootElement).getByText('label text')).toBeInTheDocument(),
  ],
];
