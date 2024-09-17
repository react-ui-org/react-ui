export const resolveContextOrProp = (contextValue, propValue) => {
  if (contextValue === false || contextValue === null) {
    return propValue;
  }

  return contextValue;
};
