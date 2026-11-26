import type { MultiSelectFieldSearchAlgorithm } from '../MultiSelectField.types';
import { caseInsensitiveAccentInsensitivePrefixComparator } from './_comparators/caseInsensitiveAccentInsensitivePrefixComparator';
import { genericSearch } from './genericSearch';

/**
 * Searches for options where the option label starts with the search string, ignoring case and accents.
 */
export const caseInsensitiveAccentInsensitivePrefixSearch: MultiSelectFieldSearchAlgorithm = (
  options,
  searchString,
) => genericSearch(
  options,
  searchString,
  caseInsensitiveAccentInsensitivePrefixComparator,
);
