export interface ButtonGroupProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * If `true`, the button group will span the full width of its parent.
   */
  block?: boolean;
  /**
   * Buttons to be grouped. If none are provided nothing is rendered.
   */
  children?: React.ReactNode;
  /**
   * If `true`, all buttons inside the group will be disabled.
   */
  disabled?: boolean;
  /**
   * Visual priority to highlight or suppress the buttons.
   */
  priority?: Priority;
  /**
   * Size of the buttons.
   */
  size?: Size;
}

export interface ButtonGroupContextProps {
  /**
   * If `true`, the button group will span the full width of its parent.
   */
  block?: boolean;
  /**
   * If `true`, all buttons inside the group will be disabled.
   */
  disabled?: boolean;
  /**
   * Visual priority to highlight or suppress the buttons.
   */
  priority?: Priority;
  /**
   * Size of the buttons.
   */
  size?: Size;
}
