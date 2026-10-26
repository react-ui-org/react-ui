import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import styles from './Paper.module.scss';
import type { PaperProps } from './Paper.types';

export const Paper: React.FunctionComponent<PaperProps> = ({
  children,
  muted = false,
  raised = false,
  ...restProps
}: PaperProps) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      muted && styles.isRootMuted,
      raised && styles.isRootRaised,
    )}
  >
    {children}
  </div>
);

export const PaperWithGlobalProps = withGlobalProps<PaperProps, never>(Paper, 'Paper');

export default PaperWithGlobalProps;
