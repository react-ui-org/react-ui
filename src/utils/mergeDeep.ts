const isObject = (obj: unknown) => obj && typeof obj === 'object' && !Array.isArray(obj);

/**
 * Performs a deep merge of objects and returns new object.
 *
 * @param {...object} objects
 * @returns {object}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeDeep = (...objects: any[]) => objects.reduce((prev, obj) => {
  if (obj == null) {
    return prev;
  }

  const newObject = { ...prev };

  Object.keys(obj).forEach((key) => {
    const previousVal = prev[key];
    const currentVal = obj[key];

    if (isObject(previousVal) && isObject(currentVal)) {
      newObject[key] = mergeDeep(previousVal, currentVal);
    } else {
      newObject[key] = currentVal;
    }
  });

  return newObject;
}, {});
