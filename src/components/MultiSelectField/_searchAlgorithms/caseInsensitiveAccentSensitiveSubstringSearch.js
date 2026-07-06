import { caseInsensitiveAccentSensitiveSubstringComparator } from './_comparators/caseInsensitiveAccentSensitiveSubstringComparator';
import { genericSearch } from './genericSearch';

/** @import { Option } from './genericSearch' */

/**
 * Searches for options where the option label contains the search string, ignoring case but considering accents.
 *
 * @param {Option[]} options
 * @param {string} searchString
 * @returns {Option[]}
 */
export const caseInsensitiveAccentSensitiveSubstringSearch = (options, searchString) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentSensitiveSubstringComparator,
);
