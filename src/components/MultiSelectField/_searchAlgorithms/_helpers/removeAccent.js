/**
 * Removes accents from a string.
 *
 * It uses the normalize method to convert the string to its Unicode Normalization Form D (NFD)
 * and then uses a regular expression to remove all the accents.
 *
 * @param {string} value
 * @returns {string}
 */
export const removeAccent = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
