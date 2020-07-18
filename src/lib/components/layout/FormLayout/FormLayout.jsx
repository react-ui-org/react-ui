import flattenChildren from 'react-keyed-flatten-children';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './FormLayout.scss';

const PREDEFINED_LABEL_WIDTH_VALUES = ['auto', 'default', 'limited'];

const FormLayout = (props) => {
  const {
    children,
    fieldLayout,
    id,
    labelWidth,
    labelWidthFallback,
  } = props;

  if (!children) {
    return null;
  }

  const HAS_CUSTOM_LABEL_WIDTH = !PREDEFINED_LABEL_WIDTH_VALUES.includes(labelWidth);
  let customLabelWidth;

  if (HAS_CUSTOM_LABEL_WIDTH) {
    customLabelWidth = labelWidth;
  }

  const fieldLayoutClass = (layout) => {
    if (layout === 'horizontal') {
      return styles.rootFieldLayoutHorizontal;
    }

    return styles.rootFieldLayoutVertical;
  };

  const labelWidthClass = (width) => {
    if (HAS_CUSTOM_LABEL_WIDTH) {
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

  const inlineStyle = (customWidth, customWidthFallback) => {
    const style = {};

    if (customWidth) {
      style['--rui-custom-label-width'] = customWidth;
    }

    if (customWidthFallback) {
      style['--rui-custom-label-width-fallback'] = customWidthFallback;
    }

    return style;
  };

  return (
    <div
      id={id}
      className={[
        styles.root,
        fieldLayoutClass(fieldLayout),
        fieldLayout === 'horizontal' ? labelWidthClass(labelWidth) : '',
        labelWidthFallback ? styles.hasRootCustomLabelWidthFallback : '',
      ].join(' ')}
      style={inlineStyle(customLabelWidth, labelWidthFallback)}
    >
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
  children: null,
  fieldLayout: 'vertical',
  id: undefined,
  labelWidth: 'default',
  labelWidthFallback: undefined,
};

FormLayout.propTypes = {
  children: PropTypes.node,
  fieldLayout: PropTypes.oneOf(['horizontal', 'vertical']),
  id: PropTypes.string,
  labelWidth: PropTypes.oneOfType([
    PropTypes.oneOf(PREDEFINED_LABEL_WIDTH_VALUES),
    PropTypes.string,
  ]),
  labelWidthFallback: PropTypes.string,
};

export default FormLayout;
