export const resolveContextOrProp = <ContextValue, PropValue>(
  contextValue: ContextValue,
  propValue: PropValue,
): Exclude<ContextValue, false | null> | PropValue => {
  // We need to test:
  //  * `false` - for when the `contextValue` is boolean
  //  * `null` - for when the `contextValue` is non-boolean
  if (contextValue === false || contextValue === null) {
    return propValue;
  }

  return contextValue as Exclude<ContextValue, false | null>;
};
