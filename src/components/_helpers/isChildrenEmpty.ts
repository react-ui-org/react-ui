import type { ReactNode } from 'react';

export const isChildrenEmpty = (children: ReactNode) => children == null
  || children === undefined
  || children === false
  || (Array.isArray(children) && children.length === 0);
