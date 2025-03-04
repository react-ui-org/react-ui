export type OptionProps = {
  /**
   * If `true` the option cannot be selected.
   */
  disabled?: boolean;
  /**
   * ID of an individual option.
   */
  id?: string;
  /**
   * Option label.
   */
  label: string;
  /**
   * Option value.
   */
  value: string | number;
};
