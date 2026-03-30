import React from 'react';
import type { HTMLAttributes } from 'react';
import { Text } from '..';

// Types for story component will be improved when we have full TypeScript support
type TextForTestProps = HTMLAttributes<HTMLElement>;
type TextForRenderTestProps = { children: React.ReactNode };

export const TextForTest = ({
  ...props
}: TextForTestProps) => {
  const {
    children,
    ...restProps
  } = props;

  return (
    <div
      style={{
        display: 'block',
        maxWidth: '200px',
      }}
    >
      <Text {...restProps}>
        { children || 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.'}
      </Text>
    </div>
  );
};

export const TextForRenderTest = ({ children }: TextForRenderTestProps) => (
  <Text>
    {children}
  </Text>
);
