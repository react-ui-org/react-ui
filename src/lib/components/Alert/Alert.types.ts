export interface AlertProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Alert Body
   */
  children: React.ReactNode;
  /**
   * [Color variant] (/foundation/colors#component-colors) to clarify importance and meaning of the alert.
   */
  color?: Color;
  /**
   * Optional element to be displayed next to the alert body.
   */
  icon?: React.ReactNode;
  /**
   * ID of the root HTML element.
   *
   * Also serves as base for ids of nested elements:
   * * `<ID>__close`
   * * `<ID>__content`
   */
  id?: string;
  /**
   * Function to call when the close button is clicked. If not provided, close buttons will be
   * hidden.
   */
  onClose?: () => void;
}
