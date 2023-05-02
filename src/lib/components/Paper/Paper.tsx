import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../_helpers/transferProps';
import styles from './Paper.scss';
import { PaperProps } from './Paper.types';

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
