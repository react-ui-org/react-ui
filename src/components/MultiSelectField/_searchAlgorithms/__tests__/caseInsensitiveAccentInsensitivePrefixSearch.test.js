import {
  caseInsensitiveAccentInsensitivePrefixSearch,
} from '../caseInsensitiveAccentInsensitivePrefixSearch';

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

describe('caseInsensitiveAccentInsensitivePrefixSearch', () => {
  it('matches prefix ignoring case and accents', () => {
    expect(labelsOf(caseInsensitiveAccentInsensitivePrefixSearch(options, 'ř'))).toEqual(['Řepa', 'Rajče']);
    expect(labelsOf(caseInsensitiveAccentInsensitivePrefixSearch(options, 'RE'))).toEqual(['Řepa']);
  });

  it('does not match substring', () => {
    expect(labelsOf(caseInsensitiveAccentInsensitivePrefixSearch(options, 'epa'))).toEqual([]);
  });
});
