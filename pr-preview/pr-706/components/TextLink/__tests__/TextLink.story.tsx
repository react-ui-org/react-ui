import React from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { TextLink } from '..';

// Types for story component will be improved when we have full TypeScript support
type TextLinkForTestProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const TextLinkForTest = ({
  ...props
}: TextLinkForTestProps) => (
  <TextLink
    href="/test/uri"
    label="Link"
    {...props}
  />
);
