import { caseInsensitiveAccentSensitivePrefixComparator } from './_comparators/caseInsensitiveAccentSensitivePrefixComparator';
import { genericSearch } from './genericSearch';

/** @import { Option } from './genericSearch' */

/**
 * Searches for options where the option label starts with the search string, ignoring case but considering accents.
 *
 * @param {Option[]} options
 * @param {string} searchString
 * @returns {Option[]}
 */
export const caseInsensitiveAccentSensitivePrefixSearch = (options, searchString) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentSensitivePrefixComparator,
);
