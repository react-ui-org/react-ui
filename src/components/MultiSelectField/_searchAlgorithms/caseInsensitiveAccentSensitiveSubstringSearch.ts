import type { MultiSelectFieldSearchAlgorithm } from '../MultiSelectField.types';
import { caseInsensitiveAccentSensitiveSubstringComparator } from './_comparators/caseInsensitiveAccentSensitiveSubstringComparator';
import { genericSearch } from './genericSearch';

/**
 * Searches for options where the option label contains the search string, ignoring case but considering accents.
 */
export const caseInsensitiveAccentSensitiveSubstringSearch: MultiSelectFieldSearchAlgorithm = (
  options,
  searchString,
) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentSensitiveSubstringComparator,
);
