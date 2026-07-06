import {
  caseInsensitiveAccentSensitiveSubstringSearch,
} from '../caseInsensitiveAccentSensitiveSubstringSearch';

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

describe('caseInsensitiveAccentSensitiveSubstringSearch', () => {
  it('matches substring ignoring case but considering accents', () => {
    expect(labelsOf(caseInsensitiveAccentSensitiveSubstringSearch(options, 'epa'))).toEqual(['Řepa']);
    expect(labelsOf(caseInsensitiveAccentSensitiveSubstringSearch(options, 'AJČ'))).toEqual(['Rajče']);
  });

  it('does not match when accents are not preserved', () => {
    expect(labelsOf(caseInsensitiveAccentSensitiveSubstringSearch(options, 'ajc'))).toEqual([]);
  });
});
