import type { ReactNode } from 'react';

/**
 * Props of the `MultiSelectFieldDropdownGroup` component.
 */
export type MultiSelectFieldDropdownGroupProps = {
  children: ReactNode;
  /** ID of the group heading, the group is labelled by it. */
  id: string;
  label: string;
};
