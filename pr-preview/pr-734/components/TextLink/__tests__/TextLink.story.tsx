import React from 'react';
import { TextLink } from '..';
import type { TextLinkProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type TextLinkForTestProps = StoryProps<TextLinkProps, 'href' | 'label'>;

export const TextLinkForTest = ({
  href = '/test/uri',
  label = 'Link',
  ...props
}: TextLinkForTestProps) => (
  <TextLink
    href={href}
    label={label}
    {...props}
  />
);
