export const resolveContextOrProp = (contextValue, propValue) => {
  // We need to test:
  //  * `false` - for when the `contextValue` is boolean
  //  * `null` - for when the `contextValue` is non-boolean
  if (contextValue === false || contextValue === null) {
    return propValue;
  }

  return contextValue;
};
