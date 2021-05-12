import {within} from "@testing-library/react";

export const variantPropTest = [
  [
    { variant: 'filled' },
    (rootElement) => expect(rootElement).toHaveClass('rootVariantFilled'),
  ],
  [
    { variant: 'outline' },
    (rootElement) => expect(rootElement).toHaveClass('rootVariantOutline'),
  ],
];
