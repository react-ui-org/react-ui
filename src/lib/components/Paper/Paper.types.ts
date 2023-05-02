export interface PaperProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content to be placed onto Paper.
   */
  children: React.ReactNode;
  /**
   * Visually suppress Paper.
   */
  muted?: false;
  /**
   * Add shadow to pull the Paper above surface.
   */
  raised?: false;
}
