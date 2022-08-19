import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ScrollView } from '../ScrollView';

const mandatoryProps = {
  children: <div>content text</div>,
};

const scrollViewRefPropTest = (ref) => [
  [
    {
      id: 'id',
      ref,
    },
    () => expect(ref.current.parentNode).toHaveAttribute('id', 'id'),
  ],
];

describe('rendering', () => {
  it.each([
    ...scrollViewRefPropTest(React.createRef()),
    [
      { arrows: true },
      (rootElement) => {
        expect(within(rootElement).getByTitle('Next'));
        expect(within(rootElement).getByTitle('Previous'));
      },
    ],
    [
      { arrows: false },
      (rootElement) => {
        expect(within(rootElement).queryByTitle('Next')).not.toBeInTheDocument();
        expect(within(rootElement).queryByTitle('Previous')).not.toBeInTheDocument();
      },
    ],
    [
      {
        arrows: true,
        id: 'id',
      },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByTestId('id__content'));
        expect(within(rootElement).getByTitle('Next')).toHaveAttribute('id', 'id__arrowNextButton');
        expect(within(rootElement).getByTitle('Previous')).toHaveAttribute('id', 'id__arrowPrevButton');
      },
    ],
    [
      {
        arrows: true,
        nextArrowColor: 'color',
        nextArrowElement: <span>next arrow</span>,
        nextArrowInitialOffset: 'offset',
      },
      (rootElement) => {
        expect(within(rootElement).getByText('next arrow'));
        expect(rootElement).toHaveStyle({
          '--rui-local-next-arrow-color': 'color',
          '--rui-local-next-arrow-initial-offset': 'offset',
        });
      },
    ],
    [
      {
        arrows: true,
        prevArrowColor: 'color',
        prevArrowElement: <span>prev arrow</span>,
        prevArrowInitialOffset: 'offset',
      },
      (rootElement) => {
        expect(within(rootElement).getByText('prev arrow'));
        expect(rootElement).toHaveStyle({
          '--rui-local-prev-arrow-color': 'color',
          '--rui-local-prev-arrow-initial-offset': 'offset',
        });
      },
    ],
    // `arrowsScrollStep` untested
    // `autoScroll` untested
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    // `debounce` untested
    [
      { direction: 'vertical' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootVertical');
        expect(rootElement).toHaveStyle({
          '--rui-local-end-shadow-direction': 'to top',
          '--rui-local-start-shadow-direction': 'to bottom',
        });
      },
    ],
    [
      { direction: 'horizontal' },
      (rootElement) => {
        expect(rootElement).toHaveClass('isRootHorizontal');
        expect(rootElement).toHaveStyle({
          '--rui-local-end-shadow-direction': 'to left',
          '--rui-local-start-shadow-direction': 'to right',
        });
      },
    ],
    [
      {
        endShadowBackground: 'background',
        endShadowInitialOffset: 'offset',
        endShadowSize: 'size',
      },
      (rootElement) => expect(rootElement).toHaveStyle({
        '--rui-local-end-shadow-background': 'background',
        '--rui-local-end-shadow-initial-offset': 'offset',
        '--rui-local-end-shadow-size': 'size',
      }),
    ],
    [
      { scrollbar: true },
      (rootElement) => expect(rootElement).not.toHaveClass('hasRootScrollbarDisabled'),
    ],
    [
      { scrollbar: false },
      (rootElement) => expect(rootElement).toHaveClass('hasRootScrollbarDisabled'),
    ],
    [
      {
        startShadowBackground: 'background',
        startShadowInitialOffset: 'offset',
        startShadowSize: 'size',
      },
      (rootElement) => expect(rootElement).toHaveStyle({
        '--rui-local-start-shadow-background': 'background',
        '--rui-local-start-shadow-direction': 'to bottom',
        '--rui-local-start-shadow-initial-offset': 'offset',
        '--rui-local-start-shadow-size': 'size',
      }),
    ],
    // `shadows` untested
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ScrollView
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
