/**
 * Encodes whitespace in a part of an ID, because ID references such as `aria-activedescendant`
 * or `aria-labelledby` cannot contain it.
 *
 * @param part Part of the ID, e.g. the key of an option.
 * @returns Part with whitespace URL-encoded.
 */
export const encodeIdPart = (part: string | number) => String(part).replace(/\s/g, encodeURIComponent);
