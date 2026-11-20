import type { Page } from '@playwright/test';
import type { MountResult } from '../../test';
import { mixPropTests } from '../mixPropTests';

describe('mixPropTests', () => {
  it('returns combinations of multiple prop tests', () => {
    const colorPropTests = [
      {
        name: 'color=primary',
        props: {
          color: 'primary',
        },
      },
      {
        name: 'color=secondary',
        props: {
          color: 'secondary',
        },
      },
    ];
    const priorityPropTests = [
      {
        name: 'priority=filled',
        props: {
          priority: 'filled',
        },
      },
      {
        name: 'priority=outline',
        props: {
          priority: 'outline',
        },
      },
    ];
    const sizePropTests = [
      {
        name: 'size=small',
        props: {
          size: 'small',
        },
      },
      {
        name: 'size=medium',
        props: {
          size: 'medium',
        },
      },
      {
        name: 'size=large',
        props: {
          size: 'large',
        },
      },
    ];

    const result = mixPropTests([colorPropTests, priorityPropTests, sizePropTests]);

    expect(result).toEqual([
      {
        name: 'color=primary & priority=filled & size=small',
        props: {
          color: 'primary',
          priority: 'filled',
          size: 'small',
        },
      },
      {
        name: 'color=primary & priority=filled & size=medium',
        props: {
          color: 'primary',
          priority: 'filled',
          size: 'medium',
        },
      },
      {
        name: 'color=primary & priority=filled & size=large',
        props: {
          color: 'primary',
          priority: 'filled',
          size: 'large',
        },
      },
      {
        name: 'color=primary & priority=outline & size=small',
        props: {
          color: 'primary',
          priority: 'outline',
          size: 'small',
        },
      },
      {
        name: 'color=primary & priority=outline & size=medium',
        props: {
          color: 'primary',
          priority: 'outline',
          size: 'medium',
        },
      },
      {
        name: 'color=primary & priority=outline & size=large',
        props: {
          color: 'primary',
          priority: 'outline',
          size: 'large',
        },
      },
      {
        name: 'color=secondary & priority=filled & size=small',
        props: {
          color: 'secondary',
          priority: 'filled',
          size: 'small',
        },
      },
      {
        name: 'color=secondary & priority=filled & size=medium',
        props: {
          color: 'secondary',
          priority: 'filled',
          size: 'medium',
        },
      },
      {
        name: 'color=secondary & priority=filled & size=large',
        props: {
          color: 'secondary',
          priority: 'filled',
          size: 'large',
        },
      },
      {
        name: 'color=secondary & priority=outline & size=small',
        props: {
          color: 'secondary',
          priority: 'outline',
          size: 'small',
        },
      },
      {
        name: 'color=secondary & priority=outline & size=medium',
        props: {
          color: 'secondary',
          priority: 'outline',
          size: 'medium',
        },
      },
      {
        name: 'color=secondary & priority=outline & size=large',
        props: {
          color: 'secondary',
          priority: 'outline',
          size: 'large',
        },
      },
    ]);
  });

  it('calls onBeforeSnapshot and onBeforeTest from both prop tests if defined', async () => {
    const beforeSnapshotA = jest.fn();
    const beforeSnapshotB = jest.fn();
    const beforeTestA = jest.fn();
    const beforeTestB = jest.fn();

    const groupA = [
      {
        name: 'A',
        onBeforeSnapshot: beforeSnapshotA,
        onBeforeTest: beforeTestA,
        props: { a: 1 },
      },
    ];

    const groupB = [
      {
        name: 'B',
        onBeforeSnapshot: beforeSnapshotB,
        onBeforeTest: beforeTestB,
        props: { b: 2 },
      },
    ];

    const [mixed] = mixPropTests([groupA, groupB]);

    expect(mixed.name).toBe('A & B');
    expect(mixed.props).toEqual({
      a: 1, b: 2,
    });

    const fakePage = {} as Page;
    const fakeComponent = {} as MountResult;

    await mixed.onBeforeSnapshot?.(fakePage, fakeComponent);
    await mixed.onBeforeTest?.(fakePage);

    expect(beforeSnapshotA).toHaveBeenCalledWith(fakePage, fakeComponent);
    expect(beforeSnapshotB).toHaveBeenCalledWith(fakePage, fakeComponent);
    expect(beforeTestA).toHaveBeenCalledWith(fakePage);
    expect(beforeTestB).toHaveBeenCalledWith(fakePage);
  });

  it('handles missing onBeforeSnapshot or onBeforeTest', async () => {
    const beforeSnapshotB = jest.fn();
    const beforeTestB = jest.fn();

    const groupA = [
      {
        name: 'A',
        props: { a: 1 },
      },
    ];

    const groupB = [
      {
        name: 'B',
        onBeforeSnapshot: beforeSnapshotB,
        onBeforeTest: beforeTestB,
        props: { b: 2 },
      },
    ];

    const [mixed] = mixPropTests([groupA, groupB]);
    const fakePage = {} as Page;
    const fakeComponent = {} as MountResult;

    await mixed.onBeforeSnapshot?.(fakePage, fakeComponent);
    await mixed.onBeforeTest?.(fakePage);

    expect(beforeSnapshotB).toHaveBeenCalledTimes(1);
    expect(beforeTestB).toHaveBeenCalledTimes(1);
  });
});
