import { mapTagKeyToAction } from '../mapTagKeyToAction';

describe('mapTagKeyToAction', () => {
  it.each([
    ['ArrowLeft', 'focusPrevious'],
    ['ArrowRight', 'focusNext'],
    ['Home', 'focusFirst'],
    ['End', 'focusLast'],
    ['Backspace', 'remove'],
    ['Delete', 'remove'],
    ['Escape', 'focusCombobox'],
    ['ArrowDown', 'openFirst'],
    ['ArrowUp', 'openLast'],
  ] as const)('maps %s to %s', (key, action) => {
    expect(mapTagKeyToAction({ key })).toBe(action);
  });

  it.each(['Tab', 'a', ' ', 'Enter', 'Shift'])('does not map %s, the caller moves focus to the combobox or ignores it', (key) => {
    expect(mapTagKeyToAction({ key })).toBeNull();
  });

  it.each([
    ['altKey', 'ArrowLeft'],
    ['ctrlKey', 'Backspace'],
    ['metaKey', 'Backspace'],
    ['shiftKey', 'Delete'],
  ] as const)('leaves %s + %s to the browser', (modifier, key) => {
    expect(mapTagKeyToAction({
      key,
      [modifier]: true,
    })).toBeNull();
  });
});
