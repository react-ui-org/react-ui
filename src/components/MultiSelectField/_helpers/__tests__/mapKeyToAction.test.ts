import { mapKeyToAction } from '../mapKeyToAction';
import type { KeyActionContext } from '../../MultiSelectField.types';

const context = (overrides: Partial<KeyActionContext> = {}): KeyActionContext => ({
  hasActiveOption: false,
  hasTags: false,
  isCaretAtStart: true,
  isEditable: true,
  isOpen: false,
  isSearchEmpty: true,
  isTypingAhead: false,
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

    it('opens on Space when the search text is empty, a leading space is not typed', () => {
      expect(mapKeyToAction({ key: ' ' }, context())).toBe('open');
      expect(mapKeyToAction({ key: ' ' }, context({ isEditable: false }))).toBe('open');
    });

    it('types Space when the search text is not empty', () => {
      expect(mapKeyToAction({ key: ' ' }, context({ isSearchEmpty: false }))).toBeNull();
    });

    it('leaves Home, End and Escape to the browser in the editable input', () => {
      expect(mapKeyToAction({ key: 'Home' }, context())).toBeNull();
      expect(mapKeyToAction({ key: 'End' }, context())).toBeNull();
      expect(mapKeyToAction({ key: 'Escape' }, context())).toBeNull();
    });

    it('opens and activates on Home or End without an editable input', () => {
      expect(mapKeyToAction({ key: 'Home' }, context({ isEditable: false }))).toBe('openAndActivateFirst');
      expect(mapKeyToAction({ key: 'End' }, context({ isEditable: false }))).toBe('openAndActivateLast');
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
      ['Enter', false, 'noop'],
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

    it('activates the first or last option on Home or End without an editable input', () => {
      expect(mapKeyToAction({ key: 'Home' }, context({
        isEditable: false,
        isOpen: true,
      }))).toBe('activateFirst');
      expect(mapKeyToAction({ key: 'End' }, context({
        isEditable: false,
        isOpen: true,
      }))).toBe('activateLast');
    });

    it('toggles the active option on Space in the editable input only when the search is empty', () => {
      expect(mapKeyToAction({ key: ' ' }, context({
        hasActiveOption: true,
        isOpen: true,
      }))).toBe('toggleActive');
      expect(mapKeyToAction({ key: ' ' }, context({
        hasActiveOption: true,
        isOpen: true,
        isSearchEmpty: false,
      }))).toBeNull();
    });

    it('types Space when the search text is not empty and no option is active', () => {
      expect(mapKeyToAction({ key: ' ' }, context({
        isOpen: true,
        isSearchEmpty: false,
      }))).toBeNull();
    });

    it('does nothing on Space with an empty search and no active option, so the page does not scroll', () => {
      expect(mapKeyToAction({ key: ' ' }, context({ isOpen: true }))).toBe('noop');
    });

    it('toggles the active option on Space without an editable input, and does nothing without one', () => {
      expect(mapKeyToAction({ key: ' ' }, context({
        hasActiveOption: true,
        isEditable: false,
        isOpen: true,
      }))).toBe('toggleActive');
      expect(mapKeyToAction({ key: ' ' }, context({
        isEditable: false,
        isOpen: true,
      }))).toBe('noop');
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

  describe('Arrow Left', () => {
    it('deactivates the active option in the editable input', () => {
      expect(mapKeyToAction({ key: 'ArrowLeft' }, context({
        hasActiveOption: true,
        isOpen: true,
      }))).toBe('deactivate');
    });

    it('does nothing with an active option without an editable input', () => {
      expect(mapKeyToAction({ key: 'ArrowLeft' }, context({
        hasActiveOption: true,
        hasTags: true,
        isEditable: false,
        isOpen: true,
      }))).toBeNull();
    });

    it('moves to the last tag from the start of the editable input', () => {
      expect(mapKeyToAction({ key: 'ArrowLeft' }, context({ hasTags: true }))).toBe('focusLastTag');
      expect(mapKeyToAction({ key: 'ArrowLeft' }, context({
        hasTags: true,
        isOpen: true,
      }))).toBe('focusLastTag');
    });

    it('leaves the caret inside the search text to the browser', () => {
      expect(mapKeyToAction({ key: 'ArrowLeft' }, context({
        hasTags: true,
        isCaretAtStart: false,
      }))).toBeNull();
    });

    it('does not move to a tag without tags', () => {
      expect(mapKeyToAction({ key: 'ArrowLeft' }, context())).toBeNull();
    });

    it('moves to the last tag without an editable input and without an active option', () => {
      expect(mapKeyToAction({ key: 'ArrowLeft' }, context({
        hasTags: true,
        isEditable: false,
      }))).toBe('focusLastTag');
    });

    it('does not move to a tag on Shift + Arrow Left', () => {
      expect(mapKeyToAction({
        key: 'ArrowLeft',
        shiftKey: true,
      }, context({ hasTags: true }))).toBeNull();
    });
  });

  describe('Arrow Right', () => {
    it('deactivates the active option in the editable input', () => {
      expect(mapKeyToAction({ key: 'ArrowRight' }, context({
        hasActiveOption: true,
        isOpen: true,
      }))).toBe('deactivate');
    });

    it('leaves Arrow Right to the browser otherwise', () => {
      expect(mapKeyToAction({ key: 'ArrowRight' }, context({ isOpen: true }))).toBeNull();
      expect(mapKeyToAction({ key: 'ArrowRight' }, context({
        hasActiveOption: true,
        isEditable: false,
        isOpen: true,
      }))).toBeNull();
    });
  });

  describe('Backspace', () => {
    it('moves to the last tag from an empty editable input', () => {
      expect(mapKeyToAction({ key: 'Backspace' }, context({ hasTags: true }))).toBe('focusLastTag');
      expect(mapKeyToAction({ key: 'Backspace' }, context({
        hasTags: true,
        isOpen: true,
      }))).toBe('focusLastTag');
    });

    it('moves to the last tag at any time without an editable input', () => {
      expect(mapKeyToAction({ key: 'Backspace' }, context({
        hasTags: true,
        isEditable: false,
      }))).toBe('focusLastTag');
      expect(mapKeyToAction({ key: 'Backspace' }, context({
        hasActiveOption: true,
        hasTags: true,
        isEditable: false,
        isOpen: true,
      }))).toBe('focusLastTag');
    });

    it('leaves Backspace to the browser when there is search text, no tags or a modifier', () => {
      expect(mapKeyToAction({ key: 'Backspace' }, context())).toBeNull();
      expect(mapKeyToAction({ key: 'Backspace' }, context({
        hasTags: true,
        isSearchEmpty: false,
      }))).toBeNull();
      expect(mapKeyToAction({
        ctrlKey: true,
        key: 'Backspace',
      }, context({ hasTags: true }))).toBeNull();
    });
  });

  describe('non-editable combobox', () => {
    it.each([false, true])('maps printable characters to type-ahead (open: %s)', (isOpen) => {
      expect(mapKeyToAction({ key: 'c' }, context({
        isEditable: false,
        isOpen,
      }))).toBe('typeAhead');
      expect(mapKeyToAction({ key: 'Č' }, context({
        isEditable: false,
        isOpen,
      }))).toBe('typeAhead');
    });

    it('continues type-ahead with Space while a type-ahead search is in progress', () => {
      expect(mapKeyToAction({ key: ' ' }, context({
        isEditable: false,
        isOpen: true,
        isTypingAhead: true,
      }))).toBe('typeAhead');
    });

    it('does not map characters typed with Ctrl, Meta or Alt to type-ahead', () => {
      expect(mapKeyToAction({
        ctrlKey: true,
        key: 'c',
      }, context({ isEditable: false }))).toBeNull();
      expect(mapKeyToAction({
        key: 'c',
        metaKey: true,
      }, context({ isEditable: false }))).toBeNull();
      expect(mapKeyToAction({
        altKey: true,
        key: 'c',
      }, context({ isEditable: false }))).toBeNull();
    });

    it('leaves printable characters to the editable input', () => {
      expect(mapKeyToAction({ key: 'c' }, context({ isOpen: true }))).toBeNull();
      expect(mapKeyToAction({ key: 'c' }, context())).toBeNull();
    });
  });

  it('leaves Tab to the browser', () => {
    expect(mapKeyToAction({ key: 'Tab' }, context({ hasTags: true }))).toBeNull();
    expect(mapKeyToAction({ key: 'Tab' }, context({
      hasActiveOption: true,
      isOpen: true,
    }))).toBeNull();
  });
});
