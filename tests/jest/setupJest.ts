/* eslint-disable no-console */
console.warn = (error: string) => {
  throw new Error(error);
};

console.error = (error: string) => {
  throw new Error(error);
};
