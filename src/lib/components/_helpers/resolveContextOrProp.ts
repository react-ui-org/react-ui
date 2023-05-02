// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const resolveContextOrProp = (contextValue: any, propValue: any) => {
  if (contextValue != null) {
    return contextValue;
  }

  return propValue;
};
