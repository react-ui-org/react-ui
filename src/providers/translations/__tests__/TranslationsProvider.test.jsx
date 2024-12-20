import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Alert } from '../../../components/Alert';
import TranslationsProvider from '../TranslationsProvider';

describe('rendering', () => {
  it.each([
    [
      {
        children: <Alert onClose={() => {}}>alert text</Alert>,
        translations: {
          Alert: { close: 'Zavřít' },
        },
      },
      (rootElement) => expect(within(rootElement).getByTitle('Zavřít')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <TranslationsProvider
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

