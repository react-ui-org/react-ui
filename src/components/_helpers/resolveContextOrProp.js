export const resolveContextOrProp = (contextValue, propValue) => {
  if (contextValue === false) {
    return propValue;
  }

  if (contextValue != null) {
    return contextValue;
  }

  return propValue;
};
