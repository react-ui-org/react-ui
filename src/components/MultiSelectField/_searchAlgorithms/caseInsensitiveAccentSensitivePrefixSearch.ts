import type { MultiSelectFieldSearchAlgorithm } from '../MultiSelectField.types';
import { caseInsensitiveAccentSensitivePrefixComparator } from './_comparators/caseInsensitiveAccentSensitivePrefixComparator';
import { genericSearch } from './genericSearch';

/**
 * Searches for options where the option label starts with the search string, ignoring case but considering accents.
 */
export const caseInsensitiveAccentSensitivePrefixSearch: MultiSelectFieldSearchAlgorithm = (
  options,
  searchString,
) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentSensitivePrefixComparator,
);
