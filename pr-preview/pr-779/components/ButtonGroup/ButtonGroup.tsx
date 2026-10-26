import React, {
  useMemo,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import styles from './ButtonGroup.module.scss';
import { ButtonGroupContext } from './ButtonGroupContext';
import type { ButtonGroupProps } from './ButtonGroup.types';

export const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({
  block = false,
  disabled = false,
  children,
  priority = 'filled',
  size = 'medium',
  ...restProps
}: ButtonGroupProps) => {
  const childProps = useMemo(() => ({
    block,
    disabled,
    priority,
    size,
  }), [block, disabled, priority, size]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <fieldset
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        block && styles.isRootBlock,
        getRootPriorityClassName(styles, priority),
      )}
      disabled={disabled}
    >
      <ButtonGroupContext.Provider value={childProps}>
        {children}
      </ButtonGroupContext.Provider>
    </fieldset>
  );
};

export const ButtonGroupWithGlobalProps = withGlobalProps<ButtonGroupProps, never>(ButtonGroup, 'ButtonGroup');

export default ButtonGroupWithGlobalProps;
