import flattenChildren from 'react-keyed-flatten-children';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './FormLayout.scss';

const FormLayout = (props) => {
  const {
    children,
    fieldLayout,
    id,
    labelAutoWidthFallback,
    labelWidth,
  } = props;

  if (!children) {
    return null;
  }

  let customLabelWidth;

  if (labelWidth !== 'auto' && labelWidth !== 'default') {
    customLabelWidth = labelWidth;
  }

  const fieldLayoutClass = (layout) => {
    if (layout === 'horizontal') {
      return styles.rootFieldLayoutHorizontal;
    }

    return styles.rootFieldLayoutVertical;
  };

  const labelWidthClass = (width) => {
    if (width !== 'auto' && width !== 'default') {
      return styles.hasRootLabelWidthCustom;
    }

    if (width === 'auto') {
      return styles.hasRootLabelWidthAuto;
    }

    return styles.hasRootLabelWidthDefault;
  };

  const inlineStyle = (customWidth, customAutoWidthFallback) => {
    const style = {};

    if (customWidth) {
      style['--rui-custom-label-width'] = customWidth;
    }

    if (customAutoWidthFallback) {
      style['--rui-custom-label-auto-width-fallback'] = customAutoWidthFallback;
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
        labelAutoWidthFallback ? styles.hasRootCustomLabelAutoWidthFallback : '',
      ].join(' ')}
      style={inlineStyle(customLabelWidth, labelAutoWidthFallback)}
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
  labelAutoWidthFallback: undefined,
  labelWidth: 'default',
};

FormLayout.propTypes = {
  children: PropTypes.node,
  fieldLayout: PropTypes.oneOf(['horizontal', 'vertical']),
  id: PropTypes.string,
  labelAutoWidthFallback: PropTypes.string,
  labelWidth: PropTypes.oneOfType([
    PropTypes.oneOf(['auto', 'default']),
    PropTypes.string,
  ]),
};

export default FormLayout;
