export const resolveContextOrProp = (contextValue, propValue) => {
  if (contextValue != null) {
    return contextValue;
  }

  return propValue;
};
