import AirBnbPropTypes from 'airbnb-prop-types';
import flattenChildren from 'react-keyed-flatten-children';
import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import { CheckboxField } from '../../ui/CheckboxField/CheckboxField';
import { FileInputField } from '../../ui/FileInputField/FileInputField';
import { Radio } from '../../ui/Radio/Radio';
import { SelectField } from '../../ui/SelectField/SelectField';
import { TextArea } from '../../ui/TextArea/TextArea';
import { TextField } from '../../ui/TextField/TextField';
import { Toggle } from '../../ui/Toggle/Toggle';
import { FormLayoutCustomField } from './FormLayoutCustomField';
import styles from './FormLayout.scss';

const PREDEFINED_LABEL_WIDTH_VALUES = ['auto', 'default', 'limited'];

export const FormLayout = (props) => {
  const {
    autoWidth,
    children,
    fieldLayout,
    id,
    labelWidth,
  } = props;

  if (!children) {
    return null;
  }

  const hasCustomLabelWidth = !PREDEFINED_LABEL_WIDTH_VALUES.includes(labelWidth);

  const fieldLayoutClass = (layout) => {
    if (layout === 'horizontal') {
      return styles.rootFieldLayoutHorizontal;
    }

    return styles.rootFieldLayoutVertical;
  };

  const labelWidthClass = (width) => {
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
      id={id}
      className={[
        styles.root,
        fieldLayoutClass(fieldLayout),
        autoWidth ? styles.isRootAutoWidth : '',
        fieldLayout === 'horizontal' ? labelWidthClass(labelWidth) : '',
      ].join(' ')}
      {...hasCustomLabelWidth ? { style: { '--rui-custom-label-width': labelWidth } } : {}}
    >
      {/*
        Flatten children to one-dimensional array so we get over React Fragments with the `map()`
        function.
      */}
      {flattenChildren(children).map((child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          inFormLayout: true,
          layout: fieldLayout,
        });
      })}
    </div>
  );
};

FormLayout.defaultProps = {
  autoWidth: false,
  children: null,
  fieldLayout: 'vertical',
  id: undefined,
  labelWidth: 'default',
};

const ChildrenPropTypes = [
  AirBnbPropTypes.elementType(CheckboxField),
  AirBnbPropTypes.elementType(FileInputField),
  AirBnbPropTypes.elementType(Radio),
  AirBnbPropTypes.elementType(SelectField),
  AirBnbPropTypes.elementType(TextArea),
  AirBnbPropTypes.elementType(TextField),
  AirBnbPropTypes.elementType(Toggle),
  AirBnbPropTypes.elementType(FormLayoutCustomField),
];

FormLayout.propTypes = {
  /**
   * If `true`, FormLayout will take up only as much horizontal space as necessary.
   */
  autoWidth: PropTypes.bool,
  /**
   * Supported form field components: CheckboxField, Radio, SelectField, TextArea, TextField,
   * Toggle, and FormLayoutCustomField.
   */
  children: PropTypes.oneOfType([
    ...ChildrenPropTypes,
    PropTypes.arrayOf(PropTypes.oneOfType([...ChildrenPropTypes])),
  ]),
  /**
   * Layout that is forced on children form fields.
   */
  fieldLayout: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Width of the column with form field labels. Only available if the `fieldLayout` is set to
   * `horizontal`.
   */
  labelWidth: PropTypes.oneOfType([
    PropTypes.oneOf(PREDEFINED_LABEL_WIDTH_VALUES),
    PropTypes.string,
  ]),
};

export const FormLayoutWithContext = withProviderContext(FormLayout, 'FormLayout');

export default FormLayoutWithContext;
