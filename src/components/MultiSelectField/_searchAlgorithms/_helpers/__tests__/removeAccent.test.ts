import { removeAccent } from '../removeAccent';

describe('removeAccent', () => {
  it.each([
    ['řepa', 'repa'],
    ['Škoda', 'Skoda'],
    ['àéîõü', 'aeiou'],
    ['no accents', 'no accents'],
    ['', ''],
  ])('removes accents from "%s"', (value, expected) => {
    expect(removeAccent(value)).toBe(expected);
  });
});
