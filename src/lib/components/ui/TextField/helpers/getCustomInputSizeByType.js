export default (inputType, inputSize, max) => {
  if (inputType === 'number' && max) {
    return max.toString().length;
  }

  if (inputSize) {
    return inputSize;
  }

  return null;
};
