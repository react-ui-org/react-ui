import {within} from "@testing-library/react";
import React from "react";

export const validationTextPropTest = [
  [
    { validationText: <div>validation text</div> },
    (rootElement) => expect(within(rootElement).getByText('validation text')).toBeInTheDocument(),
  ],
];
