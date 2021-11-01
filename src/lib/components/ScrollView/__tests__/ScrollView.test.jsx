import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { ScrollView } from '../ScrollView';

const mandatoryProps = {
  children: <div>content text</div>,
  translations: {
    next: 'Next',
    previous: 'Previous',
  },
};

describe('rendering', () => {
  // The API of this component is not clean and is hard to test.
  // Some tests are omitted as there are plans to change this API anyway
  it.each([
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
      { arrowsColor: 'some-color' },
      (rootElement) => expect(rootElement).toHaveStyle({ '--rui-local-arrow-color': 'some-color' }),
    ],
    // `arrowsScrollStep` untested
    // `autoScroll` untested - I have no idea how to do it - is it even possible?
    [
      { children: <div>content text</div> },
      (rootElement) => expect(within(rootElement).getByText('content text')),
    ],
    [
      {
        customEndShadowStyle: {
          background: 'style',
          boxShadow: 'style',
        },
      },
      (rootElement) => expect(rootElement).toHaveStyle({
        '--rui-local-end-shadow-background': 'style',
        '--rui-local-end-shadow-box-shadow': 'style',
      }),
    ],
    [
      {
        arrows: true,
        customNextArrow: <span>arrow</span>,
      },
      (rootElement) => expect(within(rootElement).getByText('arrow')),
    ],
    [
      {
        arrows: true,
        customPrevArrow: <span>arrow</span>,
      },
      (rootElement) => expect(within(rootElement).getByText('arrow')),
    ],
    [
      {
        customStartShadowStyle: {
          background: 'style',
          boxShadow: 'style',
        },
      },
      (rootElement) => expect(rootElement).toHaveStyle({
        '--rui-local-start-shadow-background': 'style',
        '--rui-local-start-shadow-box-shadow': 'style',
      }),
    ],
    // `debounce` untested
    // `direction` untested - interaction with other props will change significantly in #303
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
      { scrollbar: true },
      (rootElement) => expect(rootElement).not.toHaveClass('hasRootScrollbarDisabled'),
    ],
    [
      { scrollbar: false },
      (rootElement) => expect(rootElement).toHaveClass('hasRootScrollbarDisabled'),
    ],
    // `shadowColor` untested
    // `shadowSize` untested
    [
      {
        arrows: true,
        translations: {
          next: 'Další',
          previous: 'Zpět',
        },
      },
      (rootElement) => {
        expect(within(rootElement).getByTitle('Další'));
        expect(within(rootElement).getByTitle('Zpět'));
      },
    ],
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
