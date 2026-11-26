import type { MultiSelectFieldSearchAlgorithm } from '../MultiSelectField.types';
import { caseInsensitiveAccentInsensitiveSubstringComparator } from './_comparators/caseInsensitiveAccentInsensitiveSubstringComparator';
import { genericSearch } from './genericSearch';

/**
 * Searches for options where the option label contains the search string, ignoring case and accents.
 */
export const caseInsensitiveAccentInsensitiveSubstringSearch: MultiSelectFieldSearchAlgorithm = (
  options,
  searchString,
) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentInsensitiveSubstringComparator,
);
