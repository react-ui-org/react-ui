export type ElementDescriptor = {
  $element: string;
  props: Record<string, unknown>;
};

/**
 * Describe a React element with plain data, so that it can be passed in the props of a mounted story.
 *
 * The `mount` fixture sends props to the browser as serializable data, so JSX cannot be passed directly. The
 * Playwright Component Testing page turns the descriptor back into an element, see `resolveElements`. `type` is an HTML
 * or SVG tag name (e.g. `div`, `svg`) or the name of a test component registered in the page (e.g. `TestIcon`).
 * `props` can contain other descriptors, e.g. in `children`.
 */
export const element = (type: string, props: Record<string, unknown> = {}): ElementDescriptor => ({
  $element: type,
  props,
});

export const isElementDescriptor = (value: unknown): value is ElementDescriptor => (
  typeof value === 'object'
  && value !== null
  && typeof (value as ElementDescriptor).$element === 'string'
);
