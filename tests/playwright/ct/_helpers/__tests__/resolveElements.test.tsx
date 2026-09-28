import React from 'react';
import { render } from '@testing-library/react';
import { element } from '../../../utils/element';
import { resolveElements } from '../resolveElements';

describe('resolveElements', () => {
  it('turns an element descriptor with an HTML tag into an element', () => {
    const { container } = render(
      <>{resolveElements(element('div', { children: 'Label as node' }))}</>,
    );

    expect(container.innerHTML).toBe('<div>Label as node</div>');
  });

  it('turns an element descriptor with a registered test component into an element', () => {
    const { container } = render(<>{resolveElements(element('TestIcon'))}</>);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('resolves nested descriptors and passes children arrays as static children', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const { container } = render(
      <>
        {resolveElements(element('ul', {
          children: [
            element('li', { children: 'first' }),
            element('li', { children: 'second' }),
          ],
          className: 'list',
        }))}
      </>,
    );

    expect(container.innerHTML).toBe('<ul class="list"><li>first</li><li>second</li></ul>');
    // No missing `key` warning
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('resolves descriptors in nested props and keeps other values', () => {
    const resolved = resolveElements({
      label: 'Label',
      sort: {
        ascendingIcon: element('span', { children: 'up' }),
        column: 'name',
      },
      values: [1, 2],
    }) as {
      label: string;
      sort: {
        ascendingIcon: React.ReactElement;
        column: string;
      };
      values: number[];
    };

    expect(resolved.label).toBe('Label');
    expect(resolved.sort.column).toBe('name');
    expect(React.isValidElement(resolved.sort.ascendingIcon)).toBe(true);
    expect(resolved.sort.ascendingIcon.type).toBe('span');
    expect(resolved.values).toEqual([1, 2]);
  });
});
