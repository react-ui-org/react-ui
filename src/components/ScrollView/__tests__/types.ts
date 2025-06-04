export type ExtendedWindow = Window & {
  onScrollEnd?: (scrollTop: number) => void
  scrollEnd?: boolean;
};
