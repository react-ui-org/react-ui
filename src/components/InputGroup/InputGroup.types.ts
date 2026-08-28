import type {
  FieldsetHTMLAttributes,
  ReactNode,
} from 'react';
import type {
  Layout,
  Size,
} from '../../types';

/**
 * Props of the `InputGroup` component.
 */
export type InputGroupProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'disabled'> & {
  /**
   * Supported elements to be grouped:
   * * `Button`
   * * `SelectField`
   * * `TextField`
   *
   * If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * If `true`, the whole input group with all nested inputs and buttons will be disabled.
   */
  disabled?: boolean;
  /**
   * An array of help texts to be displayed.
   */
  helpTexts?: ReactNode[];
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__label`
   * * `<ID>__displayLabel`
   * * `<ID>__group`
   * * `<ID>__validationTexts`
   */
  id?: string;
  /**
   * If `false`, the label will be visually hidden (but remains accessible by assistive
   * technologies).
   */
  isLabelVisible?: boolean;
  /**
   * Input group label.
   */
  label: ReactNode;
  /**
   * Layout of the group.
   *
   * Ignored if the component is rendered within `FormLayout` component
   * as the value is inherited in such case.
   */
  layout?: Layout;
  /**
   * If `true`, the `InputGroup`'s label appears as required. Underlying `<fieldset>`
   * element does not take `required` attribute so there is no functional effect.
   */
  required?: boolean;
  /**
   * Size of the `children` elements.
   */
  size?: Size;
  /**
   * An array of validation messages to be displayed.
   */
  validationTexts?: ReactNode[];
};

/**
 * Values `InputGroup` provides to the fields and buttons rendered inside it.
 */
export type InputGroupContextValue = {
  disabled: boolean;
  layout: Layout;
  size: Size;
};

