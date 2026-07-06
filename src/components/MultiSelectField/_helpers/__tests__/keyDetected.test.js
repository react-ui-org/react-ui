import { keyDetected } from '../keyDetected';

describe('keyDetected', () => {
  it('detects a key defined as a string', () => {
    expect(keyDetected({ key: 'Escape' }, ['Escape'])).toBe(true);
    expect(keyDetected({ key: 'Enter' }, ['Escape'])).toBe(false);
  });

  it('detects a key in a binding with multiple keys', () => {
    expect(keyDetected({ key: ' ' }, ['Enter', ' '])).toBe(true);
  });

  it('detects a key defined as an object with modifiers', () => {
    const binding = [
      {
        key: 'Tab',
        shiftKey: true,
      },
    ];

    expect(keyDetected({
      key: 'Tab',
      shiftKey: true,
    }, binding)).toBe(true);
    expect(keyDetected({
      key: 'Tab',
      shiftKey: false,
    }, binding)).toBe(false);
  });
});
