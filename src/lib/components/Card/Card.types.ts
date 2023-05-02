export interface CardProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Slot for individual card elements that build up the inner layout:
   * * `CardBody`
   * * `CardFooter`
   * * `ScrollView`
   */
  children: React.ReactNode;
  /**
   * Color variant(/foundation/colors#component-colors) to clarify importance and meaning of the card.
   */
  color?: Exclude<Color, 'primary' | 'secondary' | 'selected'>;
  /**
   * Make the card more compact.
   */
  dense?: boolean;
  /**
   * If `true`, the card will be disabled.
   */
  disabled?: boolean;
  /**
   * Add shadow to pull the card above surface.
   */
  raised?: boolean;

}

export interface CardBodyProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content of the card.
   */
  children: React.ReactNode;
}

export interface CardFooterProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Card actions, usually buttons.
   */
  children: React.ReactNode;
}
