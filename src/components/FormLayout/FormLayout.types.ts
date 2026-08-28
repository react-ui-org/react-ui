import type {
  HTMLAttributes,
  ReactNode,
} from 'react';
import type { Layout } from '../../types';

export type FormLayoutPredefinedLabelWidth = 'auto' | 'default' | 'limited';

/**
 * Either one of the predefined values or any valid CSS width.
 */
export type FormLayoutLabelWidth = FormLayoutPredefinedLabelWidth | (string & NonNullable<unknown>);

/**
 * Props of the `FormLayout` component.
 */
export type FormLayoutProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * If `true`, FormLayout will take up only as much horizontal space as necessary.
   */
  autoWidth?: boolean;
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
  children?: ReactNode;
  /**
   * Layout that is forced on children form fields.
   */
  fieldLayout?: Layout;
  /**
   * Width of the column with form field labels. Only available if the `fieldLayout` is set to
   * `horizontal`.
   */
  labelWidth?: FormLayoutLabelWidth;
};

/**
 * Values `FormLayout` provides to the fields rendered inside it.
 */
export type FormLayoutContextValue = {
  layout: Layout;
};

