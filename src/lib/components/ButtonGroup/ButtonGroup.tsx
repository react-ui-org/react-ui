import React, { useMemo } from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { transferProps } from '../_helpers/transferProps';
import styles from './ButtonGroup.scss';
import { ButtonGroupContext } from './ButtonGroupContext';
import { ButtonGroupProps } from './ButtonGroup.types';

export const ButtonGroup: React.FunctionComponent<ButtonGroupProps> = ({
  block = false,
  disabled = false,
  children,
  priority = 'filled',
  size = 'medium',
  ...restProps
}) => {
  const contextValue = useMemo(() => ({
    block,
    disabled,
    priority,
    size,
  }), [block, disabled, priority, size]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        block && styles.isRootBlock,
      )}
      role="group"
    >
      <ButtonGroupContext.Provider
        value={contextValue}
      >
        {children}
      </ButtonGroupContext.Provider>
    </div>
  );
};

export const ButtonGroupWithGlobalProps = withGlobalProps(ButtonGroup, 'ButtonGroup');

export default ButtonGroupWithGlobalProps;
