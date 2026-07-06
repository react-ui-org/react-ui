import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { useClickOutside } from '../useClickOutside';

const ComponentWithClickOutside = ({ callback }) => {
  const ref = useRef(null);

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

ComponentWithClickOutside.propTypes = {
  callback: PropTypes.func.isRequired,
};

describe('useClickOutside', () => {
  it('calls callback when clicking outside the referenced element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<ComponentWithClickOutside callback={callback} />);

    fireEvent.click(getByTestId('outside'));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback when clicking inside the referenced element', () => {
    const callback = jest.fn();
    const { getByTestId } = render(<ComponentWithClickOutside callback={callback} />);

    fireEvent.click(getByTestId('inside'));
    fireEvent.click(getByTestId('inside-child'));

    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call callback after unmount', () => {
    const callback = jest.fn();
    const { unmount } = render(<ComponentWithClickOutside callback={callback} />);

    unmount();
    fireEvent.click(document.body);

    expect(callback).not.toHaveBeenCalled();
  });
});
