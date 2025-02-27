import React, {
  useMemo,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import {
  ButtonGroupContext,
  defaultValues,
} from './ButtonGroupContext';
import { ButtonGroupProps } from './ButtonGroup.types';
import { ButtonGroupContextType } from './ButtonGroupContext.types';
import styles from './ButtonGroup.module.scss';

export const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({
  block = defaultValues.block,
  disabled = defaultValues.disabled,
  children,
  priority = defaultValues.priority,
  size = defaultValues.size,
  ...restProps
}) => {
  const childProps: ButtonGroupContextType = useMemo(() => ({
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
        getRootPriorityClassName(priority, styles),
      )}
      disabled={disabled}
    >
      <ButtonGroupContext.Provider value={childProps}>
        {children}
      </ButtonGroupContext.Provider>
    </fieldset>
  );
};

export const ButtonGroupWithGlobalProps = withGlobalProps(ButtonGroup, 'ButtonGroup');

export default ButtonGroupWithGlobalProps;
