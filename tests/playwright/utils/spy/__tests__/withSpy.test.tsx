import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSpy } from '../useSpy';
import { withSpy } from '../withSpy';

type ToggleProps = {
  onChange: (checked: boolean) => void;
  onReset: () => void;
};

const Toggle = ({
  onChange,
  onReset,
}: ToggleProps) => (
  <>
    <button
      onClick={() => onChange(true)}
      type="button"
    >
      change
    </button>
    <button
      onClick={() => onReset()}
      type="button"
    >
      reset
    </button>
  </>
);

const ToggleSpy = withSpy((props: Partial<ToggleProps>) => {
  const onChange = useSpy('onChange');
  const onReset = useSpy('onReset');

  return (
    <Toggle
      onChange={onChange}
      onReset={onReset}
      {...props}
    />
  );
});

// The project configures Testing Library to use `id` as the test ID attribute, Playwright uses `data-testid`
const getSpyInput = (container: HTMLElement, name: string) => container.querySelector(`[data-testid="${name}"]`);

describe('withSpy', () => {
  it('renders an empty hidden input per registered spy', () => {
    const { container } = render(<ToggleSpy />);

    expect(getSpyInput(container, 'onChange')).toHaveValue('[]');
    expect(getSpyInput(container, 'onReset')).toHaveValue('[]');
  });

  it('renders the story with the given props', () => {
    const onChange = jest.fn();

    render(<ToggleSpy onChange={onChange} />);
    screen.getByText('change');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('lets props override the spies', async () => {
    const onChange = jest.fn();

    const { container } = render(<ToggleSpy onChange={onChange} />);
    await userEvent.click(screen.getByText('change'));

    expect(onChange).toHaveBeenCalledWith(true);
    expect(getSpyInput(container, 'onChange')).toHaveValue('[]');
  });
});
