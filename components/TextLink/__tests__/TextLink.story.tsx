import React from 'react';
import { TextLink } from '..';
import type { TextLinkProps } from '..';
import {
  useSpy,
  withSpy,
} from '../../../../tests/playwright/utils/spy';
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

export const TextLinkSpyForTest = withSpy(({
  // The link must not navigate away, the recorded calls would be lost with the page
  href = '#',
  ...props
}: TextLinkForTestProps) => {
  const onClick = useSpy('onClick', () => true);

  return (
    <TextLinkForTest
      href={href}
      onClick={onClick}
      {...props}
    />
  );
});
