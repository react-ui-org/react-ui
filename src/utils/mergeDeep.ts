import type { PlainObject } from './mergeDeep.types';

const isObject = (obj: unknown): obj is PlainObject => !!obj && typeof obj === 'object' && !Array.isArray(obj);

/**
 * Performs a deep merge of objects and returns new object.
 */
export const mergeDeep = (...objects: (PlainObject | null | undefined)[]): PlainObject => objects.reduce<PlainObject>(
  (prev, obj) => {
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
  },
  {},
);
