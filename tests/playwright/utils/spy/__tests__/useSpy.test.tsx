import React from 'react';
import type { SyntheticEvent } from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSpy } from '../useSpy';
import { withSpy } from '../withSpy';

type ToggleProps = {
  onChange: (checked: boolean, label: string) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
};

const Toggle = ({
  onChange,
  onSubmit,
}: ToggleProps) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit(event);
    }}
  >
    <button
      onClick={() => onChange(true, 'Label')}
      type="button"
    >
      change
    </button>
    <button type="submit">submit</button>
  </form>
);

const ToggleSpy = withSpy(() => {
  const onChange = useSpy('onChange');
  const onSubmit = useSpy('onSubmit', (event: SyntheticEvent<HTMLFormElement>) => event.currentTarget.tagName);

  return (
    <Toggle
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
});

// The project configures Testing Library to use `id` as the test ID attribute, Playwright uses `data-testid`
const getSpyInput = (container: HTMLElement, name: string) => container.querySelector(`[data-testid="${name}"]`);

describe('useSpy', () => {
  it('records the first argument of every call by default', async () => {
    const { container } = render(<ToggleSpy />);
    await userEvent.click(screen.getByText('change'));
    await userEvent.click(screen.getByText('change'));

    expect(getSpyInput(container, 'onChange')).toHaveValue('[true,true]');
    expect(getSpyInput(container, 'onSubmit')).toHaveValue('[]');
  });

  it('records the selected value of every call', async () => {
    const { container } = render(<ToggleSpy />);
    await userEvent.click(screen.getByText('submit'));

    expect(getSpyInput(container, 'onSubmit')).toHaveValue('["FORM"]');
  });

  it('throws when used outside of a story wrapped with withSpy', () => {
    const Unwrapped = () => {
      useSpy('onChange');

      return null;
    };
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Unwrapped />)).toThrow('Spy "onChange" must be used in a story wrapped with `withSpy`.');

    consoleErrorSpy.mockRestore();
  });
});
