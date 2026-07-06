import {
  caseInsensitiveAccentInsensitiveSubstringSearch,
} from '../caseInsensitiveAccentInsensitiveSubstringSearch';

const options = [
  {
    label: 'Řepa',
    value: 'beetroot',
  },
  {
    label: 'Rajče',
    value: 'tomato',
  },
  {
    label: 'Mrkev',
    value: 'carrot',
  },
];

const labelsOf = (results) => results.map((option) => option.label);

describe('caseInsensitiveAccentInsensitiveSubstringSearch', () => {
  it('matches substring ignoring case and accents', () => {
    expect(labelsOf(caseInsensitiveAccentInsensitiveSubstringSearch(options, 'AJC'))).toEqual(['Rajče']);
    expect(labelsOf(caseInsensitiveAccentInsensitiveSubstringSearch(options, 'e'))).toEqual(['Řepa', 'Rajče', 'Mrkev']);
  });

  it('returns empty array when nothing matches', () => {
    expect(labelsOf(caseInsensitiveAccentInsensitiveSubstringSearch(options, 'zzz'))).toEqual([]);
  });
});
