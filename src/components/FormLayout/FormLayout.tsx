import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import type { Layout } from '../../types';
import { FormLayoutContext } from './FormLayoutContext';
import styles from './FormLayout.module.scss';
import type {
  FormLayoutLabelWidth,
  FormLayoutProps,
} from './FormLayout.types';

const PREDEFINED_LABEL_WIDTH_VALUES = ['auto', 'default', 'limited'];

export const FormLayout: React.FunctionComponent<FormLayoutProps> = ({
  autoWidth = false,
  children,
  fieldLayout = 'vertical',
  labelWidth = 'default',
  ...restProps
}: FormLayoutProps) => {
  const childProps = useMemo(() => ({ layout: fieldLayout }), [fieldLayout]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  const hasCustomLabelWidth = !PREDEFINED_LABEL_WIDTH_VALUES.includes(labelWidth);

  const fieldLayoutClass = (layout: Layout) => {
    if (layout === 'horizontal') {
      return styles.isRootFieldLayoutHorizontal;
    }

    return styles.isRootFieldLayoutVertical;
  };

  const labelWidthClass = (width: FormLayoutLabelWidth) => {
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
      {...hasCustomLabelWidth ? { style: { '--rui-custom-label-width': labelWidth } as CSSProperties } : {}}
    >
      <FormLayoutContext.Provider value={childProps}>
        {children}
      </FormLayoutContext.Provider>
    </div>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
FormLayout.propTypes = {
  /**
   * If `true`, FormLayout will take up only as much horizontal space as necessary.
   */
  autoWidth: PropTypes.bool,
  /**
   * Supported form field components:
   * * `CheckboxField`
   * * `FileInputField`
   * * `FormLayoutCustomField`
   * * `Radio`
   * * `SelectField`
   * * `TextArea`
   * * `TextField`
   * * `Toggle`
   *
   * If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * Layout that is forced on children form fields.
   */
  fieldLayout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Width of the column with form field labels. Only available if the `fieldLayout` is set to
   * `horizontal`.
   */
  labelWidth: PropTypes.oneOfType([
    PropTypes.oneOf(PREDEFINED_LABEL_WIDTH_VALUES),
    PropTypes.string,
  ]),
};

export const FormLayoutWithGlobalProps = withGlobalProps<FormLayoutProps, never>(FormLayout, 'FormLayout');

export default FormLayoutWithGlobalProps;
