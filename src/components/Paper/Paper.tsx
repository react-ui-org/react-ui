import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import type { PaperProps } from './Paper.types';
import styles from './Paper.module.scss';

export const Paper: React.FunctionComponent<PaperProps> = ({
  children,
  muted = false,
  raised = false,
  ...restProps
}) => (
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

export const PaperWithGlobalProps = withGlobalProps(Paper, 'Paper');

export default PaperWithGlobalProps;
