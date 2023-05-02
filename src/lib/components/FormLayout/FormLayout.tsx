import React, { useMemo } from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { FormLayoutContext } from './FormLayoutContext';
import styles from './FormLayout.scss';
import { FormLayoutProps } from './FormLayout.types';

export const FormLayout: React.FunctionComponent<FormLayoutProps> = ({
  autoWidth,
  children,
  fieldLayout,
  labelWidth,
  ...restProps
}) => {
  const contextValue = useMemo(() => ({
    layout: fieldLayout,
  }), [fieldLayout]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  const PREDEFINED_LABEL_WIDTH_VALUES = ['auto', 'default', 'limited'];

  const hasCustomLabelWidth = !labelWidth
    || !PREDEFINED_LABEL_WIDTH_VALUES.includes(labelWidth);

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
      <FormLayoutContext.Provider
        value={contextValue}
      >
        {children}
      </FormLayoutContext.Provider>
    </div>
  );
};

export const FormLayoutWithGlobalProps = withGlobalProps(FormLayout, 'FormLayout');

export default FormLayoutWithGlobalProps;
