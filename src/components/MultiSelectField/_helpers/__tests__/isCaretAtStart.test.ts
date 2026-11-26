import { isCaretAtStart } from '../isCaretAtStart';

const createInput = (value: string, selectionStart: number, selectionEnd: number) => {
  const input = document.createElement('input');

  input.type = 'text';
  input.value = value;
  input.setSelectionRange(selectionStart, selectionEnd);

  return input;
};

describe('isCaretAtStart', () => {
  it('returns true when the caret is at the start of the input text', () => {
    expect(isCaretAtStart(createInput('ab', 0, 0))).toBe(true);
  });

  it('returns false when the caret is not at the start of the input text', () => {
    expect(isCaretAtStart(createInput('ab', 2, 2))).toBe(false);
  });

  it('returns false when the text of the input is selected from the start', () => {
    expect(isCaretAtStart(createInput('ab', 0, 2))).toBe(false);
  });

  it('returns true for elements without a caret', () => {
    expect(isCaretAtStart(document.createElement('div'))).toBe(true);
  });

  it('returns true when there is no element', () => {
    expect(isCaretAtStart(null)).toBe(true);
  });
});
