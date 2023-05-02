import { within } from '@testing-library/react';
import React from 'react';

export const helpTextPropTest = [
  [
    { helpText: <div>help text</div> },
    (rootElement: HTMLElement) => expect(within(rootElement).getByText('help text')).toBeInTheDocument(),
  ],
];
