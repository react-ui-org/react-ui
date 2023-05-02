interface Console {
    warning: (error: string) => void;
  }

console.warning = (error: string) => {
  throw new Error(error);
};