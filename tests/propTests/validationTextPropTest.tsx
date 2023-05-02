import React from 'react';
import { within } from '@testing-library/react';

export const validationTextPropTest = [
  [
    { validationText: <div>validation text</div> },
    (rootElement: HTMLElement) => expect(within(rootElement).getByText('validation text')).toBeInTheDocument(),
  ],
];
