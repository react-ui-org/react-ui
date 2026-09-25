import { mapKeyToAction } from '../mapKeyToAction';

const context = (overrides: Partial<Parameters<typeof mapKeyToAction>[1]> = {}) => ({
  canFocusLastTag: false,
  hasActiveOption: false,
  isEditable: true,
  isOpen: false,
  ...overrides,
});

describe('mapKeyToAction', () => {
  describe('closed dropdown', () => {
    it.each([
      ['ArrowDown', 'openAndActivateFirst'],
      ['ArrowUp', 'openAndActivateLast'],
      ['Enter', 'open'],
    ])('maps %s to %s', (key, action) => {
      expect(mapKeyToAction({ key }, context())).toBe(action);
    });

    it('opens on Space only when the input is not editable', () => {
      expect(mapKeyToAction({ key: ' ' }, context({ isEditable: false }))).toBe('open');
      expect(mapKeyToAction({ key: ' ' }, context())).toBeNull();
    });

    it('leaves Home, End and Escape to the browser', () => {
      expect(mapKeyToAction({ key: 'Home' }, context())).toBeNull();
      expect(mapKeyToAction({ key: 'End' }, context())).toBeNull();
      expect(mapKeyToAction({ key: 'Escape' }, context())).toBeNull();
    });
  });

  describe('open dropdown', () => {
    it.each([
      ['Escape', false, 'close'],
      ['ArrowDown', false, 'activateFirst'],
      ['ArrowUp', false, 'activateLast'],
      ['ArrowDown', true, 'activateNext'],
      ['ArrowUp', true, 'activatePrevious'],
      ['Home', true, 'activateFirst'],
      ['End', true, 'activateLast'],
      ['Enter', true, 'toggleActive'],
      ['Enter', false, null],
    ] as const)('maps %s (active option: %s) to %s', (key, hasActiveOption, action) => {
      expect(mapKeyToAction({ key }, context({
        hasActiveOption,
        isOpen: true,
      }))).toBe(action);
    });

    it('leaves Home and End for the search text until an option is active', () => {
      expect(mapKeyToAction({ key: 'Home' }, context({ isOpen: true }))).toBeNull();
      expect(mapKeyToAction({ key: 'End' }, context({ isOpen: true }))).toBeNull();
    });

    it('toggles the active option on Space only when the input is not editable', () => {
      expect(mapKeyToAction({ key: ' ' }, context({
        hasActiveOption: true,
        isEditable: false,
        isOpen: true,
      }))).toBe('toggleActive');
      expect(mapKeyToAction({ key: ' ' }, context({
        hasActiveOption: true,
        isOpen: true,
      }))).toBeNull();
    });
  });

  describe('Alt + arrow keys', () => {
    it('opens the dropdown on Alt + Arrow Down without activating an option', () => {
      expect(mapKeyToAction({
        altKey: true,
        key: 'ArrowDown',
      }, context())).toBe('open');
    });

    it('closes the dropdown on Alt + Arrow Up', () => {
      expect(mapKeyToAction({
        altKey: true,
        key: 'ArrowUp',
      }, context({ isOpen: true }))).toBe('close');
    });

    it('ignores Alt + Arrow Down on the open dropdown and Alt + Arrow Up on the closed one', () => {
      expect(mapKeyToAction({
        altKey: true,
        key: 'ArrowDown',
      }, context({ isOpen: true }))).toBeNull();
      expect(mapKeyToAction({
        altKey: true,
        key: 'ArrowUp',
      }, context())).toBeNull();
    });
  });

  describe('Arrow Left and Arrow Right', () => {
    it.each(['ArrowLeft', 'ArrowRight'])('deactivates the active option on %s in the editable input', (key) => {
      expect(mapKeyToAction({ key }, context({
        hasActiveOption: true,
        isOpen: true,
      }))).toBe('deactivate');
    });

    it.each(['ArrowLeft', 'ArrowRight'])('leaves %s to the browser otherwise', (key) => {
      expect(mapKeyToAction({ key }, context({ isOpen: true }))).toBeNull();
      expect(mapKeyToAction({ key }, context({
        hasActiveOption: true,
        isEditable: false,
        isOpen: true,
      }))).toBeNull();
    });
  });

  it('focuses the last tag on Backspace when allowed', () => {
    expect(mapKeyToAction({ key: 'Backspace' }, context({ canFocusLastTag: true }))).toBe('focusLastTag');
    expect(mapKeyToAction({ key: 'Backspace' }, context({
      canFocusLastTag: true,
      isOpen: true,
    }))).toBe('focusLastTag');
    expect(mapKeyToAction({ key: 'Backspace' }, context())).toBeNull();
  });
});
