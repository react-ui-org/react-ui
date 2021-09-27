import { Fragment } from 'react';

const removeFragmentsFromChildren = (children) => {
  if (children == null) {
    return null;
  }

  if (children?.type === Fragment) {
    const preprocessedChildren = removeFragmentsFromChildren(children?.props?.children)?.filter((v) => v != null);
    return preprocessedChildren?.length > 0 ? preprocessedChildren : null;
  }

  if (Array.isArray(children)) {
    const preprocessedChildren = children.map((child) => removeFragmentsFromChildren(child))?.filter((v) => v != null);
    return preprocessedChildren?.length > 0 ? preprocessedChildren : null;
  }

  return [children];
};

const validateChild = (child, allowedTypes, isRequired) => {
  // If children are required and not present, it is valid.
  // If children are not required nor present, it is invalid.
  if ((child == null || (Array.isArray(child) && child.length === 0))) {
    return !isRequired;
  }

  // If array of elements in passed in, check every single element recursively
  if (Array.isArray(child)) {
    return !child.some((iChild) => !validateChild(iChild, allowedTypes, isRequired));
  }

  // Validate whether single element is of allowed type
  return allowedTypes.includes(child?.type?.displayName) || allowedTypes.includes(child?.type?.name);
};

const validateChildren = (props, propName, componentName, allowedTypes, isRequired) => {
  // Remove React.Fragment elements from children.
  const children = removeFragmentsFromChildren(props[propName]);

  // If children are required and not present, return validation error.
  // If children are not required nor present, do not return error as it is valid.
  if (children == null || (Array.isArray(children) && children.length === 0)) {
    return isRequired
      ? new Error(`Prop \`${propName}\` of \`${componentName}\` does not contain valid element.`)
      : null;
  }

  // Validate children and throw return error if it is invalid
  const isInvalid = children.some((child) => !validateChild(child, allowedTypes, isRequired));
  if (isInvalid) {
    return new Error(`Prop \`${propName}\` of \`${componentName}\` does not contain valid element.`);
  }

  return null;
};

const elementOfType = (allowedTypes) => {
  if (!Array.isArray(allowedTypes) || allowedTypes.length === 0) {
    throw new TypeError('Prop type `elementOfType` requires at least 1 type.');
  }

  const elementOfTypeInternal = (
    props,
    propName,
    componentName,
  ) => validateChildren(props, propName, componentName, allowedTypes, false);
  elementOfTypeInternal.isRequired = (
    props,
    propName,
    componentName,
  ) => validateChildren(props, propName, componentName, allowedTypes, true);

  return elementOfTypeInternal;
};

export default elementOfType;
