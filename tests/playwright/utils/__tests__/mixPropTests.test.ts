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
});
