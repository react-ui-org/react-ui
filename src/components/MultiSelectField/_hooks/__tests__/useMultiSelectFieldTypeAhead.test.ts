import {
  act,
  renderHook,
} from '@testing-library/react';
import { useMultiSelectFieldTypeAhead } from '../useMultiSelectFieldTypeAhead';

const options = [
  {
    disabled: false,
    key: 'apple',
    label: 'Apple',
    value: 'apple',
  },
  {
    disabled: false,
    key: 'apricot',
    label: 'Apricot',
    value: 'apricot',
  },
  {
    disabled: false,
    key: 'banana',
    label: 'Banana',
    value: 'banana',
  },
];

describe('useMultiSelectFieldTypeAhead', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('reports the option matching the characters typed in quick succession', () => {
    const onTypeAhead = jest.fn();
    const {
      rerender, result,
    } = renderHook(
      ({ activeOptionIndex }) => useMultiSelectFieldTypeAhead(options, activeOptionIndex, onTypeAhead),
      { initialProps: { activeOptionIndex: -1 } },
    );

    act(() => {
      result.current.typeAhead('a');
    });
    expect(onTypeAhead).toHaveBeenLastCalledWith('apple');
    expect(result.current.isTypingAhead()).toBe(true);

    // The matched option became active, the next character continues the search from it
    rerender({ activeOptionIndex: 0 });
    act(() => {
      result.current.typeAhead('p');
    });
    expect(onTypeAhead).toHaveBeenLastCalledWith('apple');

    act(() => {
      result.current.typeAhead('r');
    });
    expect(onTypeAhead).toHaveBeenLastCalledWith('apricot');
  });

  it('reports no match and starts over when nothing matches', () => {
    const onTypeAhead = jest.fn();
    const { result } = renderHook(() => useMultiSelectFieldTypeAhead(options, -1, onTypeAhead));

    act(() => {
      result.current.typeAhead('x');
    });

    expect(onTypeAhead).toHaveBeenLastCalledWith(null);
    expect(result.current.isTypingAhead()).toBe(false);
  });

  it('starts a new search after a pause in typing', () => {
    const onTypeAhead = jest.fn();
    const {
      rerender, result,
    } = renderHook(
      ({ activeOptionIndex }) => useMultiSelectFieldTypeAhead(options, activeOptionIndex, onTypeAhead),
      { initialProps: { activeOptionIndex: -1 } },
    );

    act(() => {
      result.current.typeAhead('a');
    });
    rerender({ activeOptionIndex: 0 });

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.isTypingAhead()).toBe(false);

    // "b" alone is searched from the option after the active one, "ab" would match nothing
    act(() => {
      result.current.typeAhead('b');
    });
    expect(onTypeAhead).toHaveBeenLastCalledWith('banana');
  });

  it('clears the pending reset of the typed characters on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const {
      result, unmount,
    } = renderHook(() => useMultiSelectFieldTypeAhead(options, -1, jest.fn()));

    act(() => {
      result.current.typeAhead('a');
    });
    clearTimeoutSpy.mockClear();

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);

    clearTimeoutSpy.mockRestore();
  });
});
