import { caseInsensitiveAccentInsensitiveSubstringComparator } from './_comparators/caseInsensitiveAccentInsensitiveSubstringComparator';
import { genericSearch } from './genericSearch';

/** @import { Option } from './genericSearch' */

/**
 * Searches for options where the option label contains the search string, ignoring case and accents.
 *
 * @param {Option[]} options
 * @param {string} searchString
 * @returns {Option[]}
 */
export const caseInsensitiveAccentInsensitiveSubstringSearch = (options, searchString) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentInsensitiveSubstringComparator,
);
