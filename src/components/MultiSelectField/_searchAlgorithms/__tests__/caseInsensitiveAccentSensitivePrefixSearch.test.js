import {
  caseInsensitiveAccentSensitivePrefixSearch,
} from '../caseInsensitiveAccentSensitivePrefixSearch';

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

describe('caseInsensitiveAccentSensitivePrefixSearch', () => {
  it('matches prefix ignoring case but considering accents', () => {
    expect(labelsOf(caseInsensitiveAccentSensitivePrefixSearch(options, 'ř'))).toEqual(['Řepa']);
    expect(labelsOf(caseInsensitiveAccentSensitivePrefixSearch(options, 'r'))).toEqual(['Rajče']);
    expect(labelsOf(caseInsensitiveAccentSensitivePrefixSearch(options, 'RAJ'))).toEqual(['Rajče']);
  });

  it('does not match substring', () => {
    expect(labelsOf(caseInsensitiveAccentSensitivePrefixSearch(options, 'epa'))).toEqual([]);
  });
});
