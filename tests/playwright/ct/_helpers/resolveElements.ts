import React from 'react';
import type {
  ComponentType,
  ReactNode,
} from 'react';
import { TestIcon } from '../../components/TestIcon';
import { isElementDescriptor } from '../../utils/element';

// Test components that element descriptors can refer to by name, in addition to HTML and SVG tag names
const components: Record<string, ComponentType> = {
  TestIcon,
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => (
  typeof value === 'object'
  && value !== null
  && Object.getPrototypeOf(value) === Object.prototype
);

/**
 * Replace element descriptors created with `element()` by React elements, anywhere in `value`.
 *
 * Children given as an array are passed to the element as separate arguments, the same way as JSX passes static
 * children, so they do not need keys.
 */
export const resolveElements = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(resolveElements);
  }

  if (isElementDescriptor(value)) {
    const {
      children,
      ...props
    } = resolveElements(value.props) as Record<string, unknown>;
    const type = components[value.$element] ?? value.$element;

    if (children === undefined) {
      return React.createElement(type, props);
    }

    const childNodes = (Array.isArray(children) ? children : [children]) as ReactNode[];

    return React.createElement(type, props, ...childNodes);
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveElements(item)]),
    );
  }

  return value;
};
