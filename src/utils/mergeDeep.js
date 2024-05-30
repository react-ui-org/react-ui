const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);

/**
 * Performs a deep merge of objects and returns new object.
 *
 * @param {...object} objects
 * @returns {object}
 */
export const mergeDeep = (...objects) => objects.reduce((prev, obj) => {
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
