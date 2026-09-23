import React from 'react';
import type { PropTests } from '../../../../../tests/playwright/types';

const upIcon = (
  <svg
    aria-hidden="true"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0h24v24H0V0z"
      fill="none"
    />
    <path
      d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
    />
  </svg>
);

const downIcon = (
  <svg
    aria-hidden="true"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0h24v24H0V0z"
      fill="none"
    />
    <path
      d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
    />
  </svg>
);

export const sortPropTest: PropTests = [
  {
    name: 'sort:shape=ascActive',
    props: {
      sort: {
        ascendingIcon: upIcon,
        column: 'dateOfBirth',
        descendingIcon: downIcon,
        direction: 'asc',
      },
    },
  },
  {
    name: 'sort:shape=descActive',
    props: {
      sort: {
        ascendingIcon: upIcon,
        column: 'dateOfBirth',
        descendingIcon: downIcon,
        direction: 'desc',
      },
    },
  },
];
