const isObject = (obj) => obj && typeof obj === 'object';

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
    const pVal = prev[key];
    const oVal = obj[key];

    if (Array.isArray(pVal) && Array.isArray(oVal)) {
      newObject[key] = pVal.concat(...oVal);
    } else if (isObject(pVal) && isObject(oVal)) {
      newObject[key] = mergeDeep(pVal, oVal);
    } else {
      newObject[key] = oVal;
    }
  });

  return newObject;
}, {});
