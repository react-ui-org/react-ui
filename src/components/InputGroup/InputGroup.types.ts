import type { ReactNode } from 'react';
import type {
  CleanedComponentPropsWithChildren,
  Layout,
  Size,
} from '../../types';
import type { ButtonProps } from '../Button/Button.types';
import type { SelectFieldProps } from '../SelectField/SelectField.types';
import type { TextFieldProps } from '../TextField/TextField.types';

export type InputGroupProps = CleanedComponentPropsWithChildren<'fieldset'> & {
  /**
   * Supported elements to be grouped:
   * * `Button`
   * * `SelectField`
   * * `TextField`
   *
   * If none are provided nothing is rendered.
   */
  children?: React.JSXElementConstructor<
  ButtonProps
  | SelectFieldProps
  | TextFieldProps
  >[]
  /**
   * If `true`, the whole input group with all nested inputs and buttons will be disabled.
   */
  disabled?: boolean;
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
