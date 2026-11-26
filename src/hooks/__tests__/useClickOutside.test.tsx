import React, { useRef } from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

const ComponentWithClickOutside = ({ callback }: { callback: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, callback);

  return (
    <div>
      <div
        id="inside"
        ref={ref}
      >
        <button
          id="inside-child"
          type="button"
        >
          Inside
        </button>
      </div>
      <button
        id="outside"
        type="button"
      >
        Outside
      </button>
    </div>
  );
};

describe('useClickOutside', () => {
  it('calls callback when clicking outside the referenced element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<ComponentWithClickOutside callback={callback} />);

    fireEvent.click(getByTestId('outside'));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('calls callback when clicking anywhere on the page outside the referenced element', () => {
    const callback = jest.fn();
    render(<ComponentWithClickOutside callback={callback} />);

    fireEvent.click(document.body);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback when clicking inside the referenced element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<ComponentWithClickOutside callback={callback} />);

    fireEvent.click(getByTestId('inside'));
    fireEvent.click(getByTestId('inside-child'));

    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call callback when clicking inside the referenced element rendered in a shadow DOM', () => {
    const callback = jest.fn();
    const host = document.createElement('div');
    document.body.appendChild(host);
    const container = document.createElement('div');
    host.attachShadow({ mode: 'open' }).appendChild(container);

    render(<ComponentWithClickOutside callback={callback} />, { container });

    // The click target is retargeted to the host outside the shadow DOM on the document level
    fireEvent.click(container.querySelector('#inside-child')!);

    expect(callback).not.toHaveBeenCalled();

    host.remove();
  });

  it('uses the latest callback after rerender', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    const { rerender } = render(<ComponentWithClickOutside callback={firstCallback} />);

    rerender(<ComponentWithClickOutside callback={secondCallback} />);
    fireEvent.click(document.body);

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback after unmount', () => {
    const callback = jest.fn();
    const { unmount } = render(<ComponentWithClickOutside callback={callback} />);

    unmount();
    fireEvent.click(document.body);

    expect(callback).not.toHaveBeenCalled();
  });
});
