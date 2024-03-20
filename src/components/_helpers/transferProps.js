/**
 * Controls passing of props from the React component to the HTML element
 *
 * Sometimes it is useful to have a mechanism to pass props from the React component to a rendered HTML element.
 * It enables making the component interactive and helps improve its accessibility. However some props should
 * never be passed to the HTML element as it would break things. This function is used to filter out such props.
 *
 * When run in development mode, the function will log the error to the console if any invalid props are passed.
 *
 * @param props The props that were passed to the React component and were not used by it
 * @returns The props to be passed to the HTML element
 */
export const transferProps = (props) => {
  const {
    children,
    className,
    contentEditable,
    dangerouslySetInnerHTML,
    ref,
    staticContext,
    style,
    suppressContentEditableWarning,
    ...restProps
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    console.log('props', props);
    const invalidProps = [
      'children', // It is always either handled by the component itself or not supported.
      'className', // Classes are set by component authors, changing it arbitrarily might break things.
      'contentEditable', // Components are either interactive or not, changing it arbitrarily might break things.
      'dangerouslySetInnerHTML', // This might break things and allow for XSS attacks.
      'ref', // Forwarding `ref` is hardcoded and documented for each component.
      'staticContext', // In `react-router` (v4, v5) this is used during server side rendering, it makes no sense to pass it to a component.
      'style', // Styles are set by component authors, changing it arbitrarily might break things.
      'suppressContentEditableWarning', // Since setting `contentEditable` is not allowed, this is not needed.
    ]
      .filter((key) => props[key] !== undefined);

    if (invalidProps.length > 0) {
      // eslint-disable-next-line no-console
      console.error(`Invalid prop(s) supplied to the "transferProps" function: "${invalidProps.join('", "')}"`);
    }
  }

  return restProps;
};
