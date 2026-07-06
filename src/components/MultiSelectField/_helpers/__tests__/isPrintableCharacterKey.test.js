import { isPrintableCharacterKey } from '../isPrintableCharacterKey';

const keyEvent = (overrides) => ({
  altKey: false,
  ctrlKey: false,
  key: 'A',
  metaKey: false,
  ...overrides,
});

describe('isPrintableCharacterKey', () => {
  it('detects printable characters', () => {
    expect(isPrintableCharacterKey(keyEvent({ key: 'A' }))).toBe(true);
    expect(isPrintableCharacterKey(keyEvent({ key: '0' }))).toBe(true);
    expect(isPrintableCharacterKey(keyEvent({ key: 'Ř' }))).toBe(true);
    expect(isPrintableCharacterKey(keyEvent({ key: ' ' }))).toBe(true);
  });

  it('rejects non-printable keys', () => {
    expect(isPrintableCharacterKey(keyEvent({ key: 'Enter' }))).toBe(false);
    expect(isPrintableCharacterKey(keyEvent({ key: 'ArrowDown' }))).toBe(false);
    expect(isPrintableCharacterKey(keyEvent({ key: 'F5' }))).toBe(false);
  });

  it('rejects characters typed with a modifier key', () => {
    expect(isPrintableCharacterKey(keyEvent({ ctrlKey: true }))).toBe(false);
    expect(isPrintableCharacterKey(keyEvent({ altKey: true }))).toBe(false);
    expect(isPrintableCharacterKey(keyEvent({ metaKey: true }))).toBe(false);
  });
});
