import React, { useMemo } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import {
  defaultValues,
  FormLayoutContext,
} from './FormLayoutContext';
import styles from './FormLayout.module.scss';
import { FormLayoutProps } from './FormLayout.types';
import { FormLayoutContextType } from './FormLayoutContext.types';
import { PREDEFINED_LABEL_WIDTH_VALUES } from './constants';

export const FormLayout: React.FunctionComponent<FormLayoutProps> = ({
  autoWidth = false,
  children,
  fieldLayout = defaultValues.layout,
  labelWidth = 'default',
  ...restProps
}) => {
  const childProps: FormLayoutContextType = useMemo(() => ({ layout: fieldLayout }), [fieldLayout]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  const hasCustomLabelWidth = !PREDEFINED_LABEL_WIDTH_VALUES.includes(labelWidth);

  const fieldLayoutClass = (layout: FormLayoutProps['fieldLayout']) => {
    if (layout === 'horizontal') {
      return styles.isRootFieldLayoutHorizontal;
    }

    return styles.isRootFieldLayoutVertical;
  };

  const labelWidthClass = (width: FormLayoutProps['labelWidth']) => {
    if (hasCustomLabelWidth) {
      return styles.hasRootLabelWidthCustom;
    }

    if (width === 'auto') {
      return styles.hasRootLabelWidthAuto;
    }

    if (width === 'limited') {
      return styles.hasRootLabelWidthLimited;
    }

    return styles.hasRootLabelWidthDefault;
  };

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        fieldLayoutClass(fieldLayout),
        autoWidth && styles.isRootAutoWidth,
        fieldLayout === 'horizontal' && labelWidthClass(labelWidth),
      )}
      {...hasCustomLabelWidth ? { style: { '--rui-custom-label-width': labelWidth } as React.CSSProperties } : {}}
    >
      <FormLayoutContext.Provider value={childProps}>
        {children}
      </FormLayoutContext.Provider>
    </div>
  );
};

export const FormLayoutWithGlobalProps = withGlobalProps(FormLayout, 'FormLayout');

export default FormLayoutWithGlobalProps;
