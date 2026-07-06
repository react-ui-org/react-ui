import { caseInsensitiveAccentInsensitivePrefixComparator } from './_comparators/caseInsensitiveAccentInsensitivePrefixComparator';
import { genericSearch } from './genericSearch';

/** @import { Option } from './genericSearch' */

/**
 * Searches for options where the option label starts with the search string, ignoring case and accents.
 *
 * @param {Option[]} options
 * @param {string} searchString
 * @returns {Option[]}
 */
export const caseInsensitiveAccentInsensitivePrefixSearch = (options, searchString) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentInsensitivePrefixComparator,
);
