import { CSSProperties } from 'react';

export interface PlaceholderProps {
  bordered?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  dark?: boolean;
  height?: string;
  inline?: boolean;
  width?: string;
}

export interface CustomCSSProperties extends CSSProperties {
  '--rui-local-height'?: string | undefined;
  '--rui-local-width'?: string | undefined;
}
